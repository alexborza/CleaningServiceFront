import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesHistoryComponent } from './services-history.component';

describe('ServicesHistoryComponent', () => {
  let component: ServicesHistoryComponent;
  let fixture: ComponentFixture<ServicesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
