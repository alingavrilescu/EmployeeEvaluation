import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplateDetailsComponent } from './form-template-details.component';

describe('FormTemplateDetailsComponent', () => {
  let component: FormTemplateDetailsComponent;
  let fixture: ComponentFixture<FormTemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTemplateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
