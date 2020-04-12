import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberIconComponent } from './number-icon.component';

describe('NumberIconComponent', () => {
  let component: NumberIconComponent;
  let fixture: ComponentFixture<NumberIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
