import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseSectionComponent } from './purchase-section.component';

describe('PurchaseSectionComponent', () => {
  let component: PurchaseSectionComponent;
  let fixture: ComponentFixture<PurchaseSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseSectionComponent]
    });
    fixture = TestBed.createComponent(PurchaseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
