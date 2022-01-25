import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningServiceDetailComponent } from './cleaning-service-detail.component';

describe('CleaningServiceDetailComponent', () => {
  let component: CleaningServiceDetailComponent;
  let fixture: ComponentFixture<CleaningServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningServiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
