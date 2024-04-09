import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionPopUpComponent } from './permission-pop-up.component';

describe('PermissionPopUpComponent', () => {
  let component: PermissionPopUpComponent;
  let fixture: ComponentFixture<PermissionPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
