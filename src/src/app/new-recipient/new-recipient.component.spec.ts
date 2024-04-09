import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipientComponent } from './new-recipient.component';

describe('NewRecipientComponent', () => {
  let component: NewRecipientComponent;
  let fixture: ComponentFixture<NewRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecipientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
