import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetLimitPopupComponent } from './reset-limit-popup.component';

describe('ResetLimitPopupComponent', () => {
  let component: ResetLimitPopupComponent;
  let fixture: ComponentFixture<ResetLimitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetLimitPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetLimitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
