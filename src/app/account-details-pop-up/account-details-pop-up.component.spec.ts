import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsPopUpComponent } from './account-details-pop-up.component';

describe('AccountDetailsPopUpComponent', () => {
  let component: AccountDetailsPopUpComponent;
  let fixture: ComponentFixture<AccountDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDetailsPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
