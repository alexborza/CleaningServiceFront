import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningServiceCreationComponent } from './cleaning-service-creation.component';

describe('CleaningServiceCreationComponent', () => {
  let component: CleaningServiceCreationComponent;
  let fixture: ComponentFixture<CleaningServiceCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningServiceCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningServiceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
