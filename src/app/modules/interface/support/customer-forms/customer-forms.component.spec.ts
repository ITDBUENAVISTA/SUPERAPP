import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormsComponent } from './customer-forms.component';

describe('CustomerFormsComponent', () => {
  let component: CustomerFormsComponent;
  let fixture: ComponentFixture<CustomerFormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerFormsComponent]
    });
    fixture = TestBed.createComponent(CustomerFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
