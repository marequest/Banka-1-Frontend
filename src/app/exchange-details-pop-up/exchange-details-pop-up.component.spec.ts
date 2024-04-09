import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeDetailsPopUpComponent } from './exchange-details-pop-up.component';

describe('ExchangeDetailsPopUpComponent', () => {
  let component: ExchangeDetailsPopUpComponent;
  let fixture: ComponentFixture<ExchangeDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeDetailsPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangeDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
