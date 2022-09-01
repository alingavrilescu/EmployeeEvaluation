import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersButtonsComponent } from './users-buttons.component';

describe('UsersButtonsComponent', () => {
  let component: UsersButtonsComponent;
  let fixture: ComponentFixture<UsersButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
