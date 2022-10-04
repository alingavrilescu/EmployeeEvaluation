import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaDetailsComponent } from './criteria-details.component';

describe('CriteriaDetailsComponent', () => {
  let component: CriteriaDetailsComponent;
  let fixture: ComponentFixture<CriteriaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
