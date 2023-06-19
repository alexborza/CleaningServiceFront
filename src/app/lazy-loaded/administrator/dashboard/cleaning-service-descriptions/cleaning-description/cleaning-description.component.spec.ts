import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningDescriptionComponent } from './cleaning-description.component';

describe('CleaningDescriptionComponent', () => {
  let component: CleaningDescriptionComponent;
  let fixture: ComponentFixture<CleaningDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
