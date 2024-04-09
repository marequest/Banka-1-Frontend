import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLimitPopUpComponent } from './edit-limit-pop-up.component';

describe('EditLimitPopUpComponent', () => {
  let component: EditLimitPopUpComponent;
  let fixture: ComponentFixture<EditLimitPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLimitPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLimitPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
