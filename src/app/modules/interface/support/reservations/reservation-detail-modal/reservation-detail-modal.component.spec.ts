import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDetailModalComponent } from './reservation-detail-modal.component';

describe('ReservationDetailModalComponent', () => {
  let component: ReservationDetailModalComponent;
  let fixture: ComponentFixture<ReservationDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationDetailModalComponent]
    });
    fixture = TestBed.createComponent(ReservationDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
