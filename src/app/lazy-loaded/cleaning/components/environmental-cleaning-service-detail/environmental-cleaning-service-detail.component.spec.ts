import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalCleaningServiceDetailComponent } from './environmental-cleaning-service-detail.component';

describe('EnvironmentalCleaningServiceDetailComponent', () => {
  let component: EnvironmentalCleaningServiceDetailComponent;
  let fixture: ComponentFixture<EnvironmentalCleaningServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentalCleaningServiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentalCleaningServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
