import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningDescriptionContentComponent } from './cleaning-description-content.component';

describe('CleaningDescriptionContentComponent', () => {
  let component: CleaningDescriptionContentComponent;
  let fixture: ComponentFixture<CleaningDescriptionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningDescriptionContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningDescriptionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
