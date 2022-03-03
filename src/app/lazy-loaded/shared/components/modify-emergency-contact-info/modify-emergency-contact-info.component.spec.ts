import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEmergencyContactInfoComponent } from './modify-emergency-contact-info.component';

describe('ModifyEmergencyContactInfoComponent', () => {
  let component: ModifyEmergencyContactInfoComponent;
  let fixture: ComponentFixture<ModifyEmergencyContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyEmergencyContactInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyEmergencyContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
