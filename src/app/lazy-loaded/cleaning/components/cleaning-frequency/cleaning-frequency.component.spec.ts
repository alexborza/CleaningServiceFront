import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningFrequencyComponent } from './cleaning-frequency.component';

describe('CleaningFrequencyComponent', () => {
  let component: CleaningFrequencyComponent;
  let fixture: ComponentFixture<CleaningFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningFrequencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
