import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInfoDetailsComponent } from './job-info-details.component';

describe('JobInfoDetailsComponent', () => {
  let component: JobInfoDetailsComponent;
  let fixture: ComponentFixture<JobInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobInfoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
