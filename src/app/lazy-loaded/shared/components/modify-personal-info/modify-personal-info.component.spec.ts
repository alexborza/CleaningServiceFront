import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPersonalInfoComponent } from './modify-personal-info.component';

describe('ModifyPersonalInfoComponent', () => {
  let component: ModifyPersonalInfoComponent;
  let fixture: ComponentFixture<ModifyPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
