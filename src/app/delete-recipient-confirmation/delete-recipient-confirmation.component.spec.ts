import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecipientConfirmationComponent } from './delete-recipient-confirmation.component';

describe('DeleteRecipientConfirmationComponent', () => {
  let component: DeleteRecipientConfirmationComponent;
  let fixture: ComponentFixture<DeleteRecipientConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRecipientConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteRecipientConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
