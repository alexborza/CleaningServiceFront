import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningServiceDescriptionsComponent } from './cleaning-service-descriptions.component';

describe('CleaningServiceDescriptionsComponent', () => {
  let component: CleaningServiceDescriptionsComponent;
  let fixture: ComponentFixture<CleaningServiceDescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningServiceDescriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningServiceDescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
