import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsPopUpComponent } from './payment-details-pop-up.component';

describe('PaymentDetailsPopUpComponent', () => {
  let component: PaymentDetailsPopUpComponent;
  let fixture: ComponentFixture<PaymentDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetailsPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
