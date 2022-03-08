import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyJobInfoComponent } from './modify-job-info.component';

describe('ModifyJobInfoComponent', () => {
  let component: ModifyJobInfoComponent;
  let fixture: ComponentFixture<ModifyJobInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyJobInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyJobInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
