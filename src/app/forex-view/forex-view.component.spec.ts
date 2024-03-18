import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexViewComponent } from './forex-view.component';

describe('ForexViewComponent', () => {
  let component: ForexViewComponent;
  let fixture: ComponentFixture<ForexViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForexViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForexViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
