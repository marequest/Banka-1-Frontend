import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTransactionsComponent } from './card-transactions.component';

describe('CardBankAccountsComponent', () => {
  let component: CardTransactionsComponent;
  let fixture: ComponentFixture<CardTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
