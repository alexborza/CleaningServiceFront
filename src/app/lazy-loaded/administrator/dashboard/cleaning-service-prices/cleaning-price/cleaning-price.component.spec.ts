import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningPriceComponent } from './cleaning-price.component';

describe('CleaningPriceComponent', () => {
  let component: CleaningPriceComponent;
  let fixture: ComponentFixture<CleaningPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
