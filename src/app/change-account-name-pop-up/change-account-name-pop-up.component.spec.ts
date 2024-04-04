import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAccountNamePopUpComponent } from './change-account-name-pop-up.component';

describe('ChangeAccountNamePopUpComponent', () => {
  let component: ChangeAccountNamePopUpComponent;
  let fixture: ComponentFixture<ChangeAccountNamePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeAccountNamePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeAccountNamePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
