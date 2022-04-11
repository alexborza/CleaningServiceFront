import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleCleaningServiceComponent } from './reschedule-cleaning-service.component';

describe('RescheduleCleaningServiceComponent', () => {
  let component: RescheduleCleaningServiceComponent;
  let fixture: ComponentFixture<RescheduleCleaningServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduleCleaningServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduleCleaningServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
