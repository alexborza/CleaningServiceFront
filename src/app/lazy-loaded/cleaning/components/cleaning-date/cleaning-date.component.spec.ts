import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningDateComponent } from './cleaning-date.component';

describe('CleaningDateComponent', () => {
  let component: CleaningDateComponent;
  let fixture: ComponentFixture<CleaningDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
