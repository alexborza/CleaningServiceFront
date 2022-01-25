import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSpaceDetailsComponent } from './office-space-details.component';

describe('OfficeSpaceDetailsComponent', () => {
  let component: OfficeSpaceDetailsComponent;
  let fixture: ComponentFixture<OfficeSpaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeSpaceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSpaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
