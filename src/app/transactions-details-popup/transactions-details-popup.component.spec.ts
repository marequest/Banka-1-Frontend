import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsDetailsPopupComponent } from './transactions-details-popup.component';

describe('TransactionsDetailsPopupComponent', () => {
  let component: TransactionsDetailsPopupComponent;
  let fixture: ComponentFixture<TransactionsDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsDetailsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionsDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
