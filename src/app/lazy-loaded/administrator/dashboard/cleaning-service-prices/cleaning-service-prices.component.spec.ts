import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningServicePricesComponent } from './cleaning-service-prices.component';

describe('CleaningServicePricesComponent', () => {
  let component: CleaningServicePricesComponent;
  let fixture: ComponentFixture<CleaningServicePricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningServicePricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningServicePricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
