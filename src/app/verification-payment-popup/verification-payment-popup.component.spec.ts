import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationPaymentPopupComponent } from './verification-payment-popup.component';

describe('VerificationPaymentPopupComponent', () => {
  let component: VerificationPaymentPopupComponent;
  let fixture: ComponentFixture<VerificationPaymentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationPaymentPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificationPaymentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
