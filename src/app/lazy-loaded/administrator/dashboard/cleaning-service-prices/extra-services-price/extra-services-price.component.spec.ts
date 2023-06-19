import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraServicesPriceComponent } from './extra-services-price.component';

describe('ExtraServicesPriceComponent', () => {
  let component: ExtraServicesPriceComponent;
  let fixture: ComponentFixture<ExtraServicesPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraServicesPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraServicesPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
