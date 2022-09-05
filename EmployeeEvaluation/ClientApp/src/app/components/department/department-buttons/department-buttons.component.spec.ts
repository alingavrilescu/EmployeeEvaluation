import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentButtonsComponent } from './department-buttons.component';

describe('DepartmentButtonsComponent', () => {
  let component: DepartmentButtonsComponent;
  let fixture: ComponentFixture<DepartmentButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
