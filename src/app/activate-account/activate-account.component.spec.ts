import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivateAccountComponent } from './activate-account.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ActivateAccountComponent', () => {
  let component: ActivateAccountComponent;
  let fixture: ComponentFixture<ActivateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ FormsModule, RouterTestingModule, ActivateAccountComponent, HttpClientTestingModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have stage initialized to 1', () => {
    expect(component.stage).toEqual(1);
  });

  it('should validate data correctly for stage 1', () => {
    component.email = 'test@example.com';
    component.accountNumber = '123456789012345678';
    component.phoneNumber = '1234567890';
    expect(component.validateData()).toBe(true);

    // Invalid email
    component.email = 'invalid-email';
    expect(component.validateData()).toBe(false);

    // Invalid account number
    component.email = 'test@example.com';
    component.accountNumber = '1234567890'; // shorter than expected
    expect(component.validateData()).toBe(false);
  });

  it('should validate data correctly for stage 2', () => {
    component.stage = 2;
    component.activationCode = '123e4567-e89b-12d3-a456-426614174000'; // Valid UUID
    expect(component.validateData()).toBe(true);

    // Invalid activation code
    component.activationCode = 'invalid-activation-code';
    expect(component.validateData()).toBe(false);
  });

  it('should validate data correctly for stage 3', () => {
    component.stage = 3;
    component.password = 'Test1234';
    component.confirmPassword = 'Test1234';
    expect(component.validateData()).toBe(true);

    // Invalid password (missing uppercase letter)
    component.password = 'test1234';
    component.confirmPassword = 'test1234';
    expect(component.validateData()).toBe(false);

    // Passwords don't match
    component.password = 'Test1234';
    component.confirmPassword = 'Test4321';
    expect(component.validateData()).toBe(false);
  });

  it('should go to next stage if data is valid', () => {
    spyOn(component, 'finishActivation');
    spyOn(component, 'validateData').and.returnValue(true);

    component.nextStage();

    expect(component.stage).toEqual(2);
    expect(component.finishActivation).not.toHaveBeenCalled();
  });

  it('should not go to next stage if data is invalid', () => {
    spyOn(component, 'finishActivation');
    spyOn(component, 'validateData').and.returnValue(false);

    component.nextStage();

    expect(component.stage).toEqual(1);
    expect(component.finishActivation).not.toHaveBeenCalled();
  });

  it('should navigate to login page after finishing activation', async () => {
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(component.customerService, 'finalActivation').and.returnValue(Promise.resolve(true));

    component.stage = 3;
    component.activationCode = '123e4567-e89b-12d3-a456-426614174000';
    component.password = 'Test1234';
    component.confirmPassword = 'Test1234';

    await component.finishActivation();

    expect(component.router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should display error if final activation fails', async () => {
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(component.customerService, 'finalActivation').and.returnValue(Promise.resolve(false));
    spyOn(component, 'previousStage');

    component.stage = 3;
    component.activationCode = 'invalid-activation-code';
    component.password = 'Test1234';
    component.confirmPassword = 'Test1234';

    await component.finishActivation();

    expect(component.previousStage).toHaveBeenCalled();
    expect(component.error).toEqual('Activation code is not correct. Please try again');
  });
});
