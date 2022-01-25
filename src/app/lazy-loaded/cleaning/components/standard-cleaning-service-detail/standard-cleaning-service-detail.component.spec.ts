import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCleaningServiceDetailComponent } from './standard-cleaning-service-detail.component';

describe('StandardCleaningServiceDetailComponent', () => {
  let component: StandardCleaningServiceDetailComponent;
  let fixture: ComponentFixture<StandardCleaningServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardCleaningServiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardCleaningServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
