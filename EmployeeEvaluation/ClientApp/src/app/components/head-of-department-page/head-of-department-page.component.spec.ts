import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadOfDepartmentPageComponent } from './head-of-department-page.component';

describe('HeadOfDepartmentPageComponent', () => {
  let component: HeadOfDepartmentPageComponent;
  let fixture: ComponentFixture<HeadOfDepartmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadOfDepartmentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadOfDepartmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
