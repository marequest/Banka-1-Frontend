import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureViewComponent } from './future-view.component';

describe('FutureViewComponent', () => {
  let component: FutureViewComponent;
  let fixture: ComponentFixture<FutureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FutureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
