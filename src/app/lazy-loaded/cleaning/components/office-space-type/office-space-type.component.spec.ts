import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSpaceTypeComponent } from './office-space-type.component';

describe('OfficeSpaceTypeComponent', () => {
  let component: OfficeSpaceTypeComponent;
  let fixture: ComponentFixture<OfficeSpaceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeSpaceTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSpaceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
