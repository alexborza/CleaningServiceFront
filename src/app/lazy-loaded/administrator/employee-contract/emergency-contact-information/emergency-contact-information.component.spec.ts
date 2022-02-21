import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyContactInformationComponent } from './emergency-contact-information.component';

describe('EmergencyContactInformationComponent', () => {
  let component: EmergencyContactInformationComponent;
  let fixture: ComponentFixture<EmergencyContactInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyContactInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
