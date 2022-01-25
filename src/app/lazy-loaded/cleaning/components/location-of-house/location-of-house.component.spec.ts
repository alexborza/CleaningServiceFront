import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationOfHouseComponent } from './location-of-house.component';

describe('LocationOfHouseComponent', () => {
  let component: LocationOfHouseComponent;
  let fixture: ComponentFixture<LocationOfHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationOfHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationOfHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
