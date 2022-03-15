import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAgendaComponent } from './employee-agenda.component';

describe('EmployeeAgendaComponent', () => {
  let component: EmployeeAgendaComponent;
  let fixture: ComponentFixture<EmployeeAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
