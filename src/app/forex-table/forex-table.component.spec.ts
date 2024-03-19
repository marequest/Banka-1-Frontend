import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexTableComponent } from './forex-table.component';

describe('ForexTableComponent', () => {
  let component: ForexTableComponent;
  let fixture: ComponentFixture<ForexTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForexTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForexTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
