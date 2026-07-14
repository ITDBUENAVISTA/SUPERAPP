import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormsReviewComponent } from './customer-forms-review.component';

describe('CustomerFormsReviewComponent', () => {
  let component: CustomerFormsReviewComponent;
  let fixture: ComponentFixture<CustomerFormsReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerFormsReviewComponent]
    });
    fixture = TestBed.createComponent(CustomerFormsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
