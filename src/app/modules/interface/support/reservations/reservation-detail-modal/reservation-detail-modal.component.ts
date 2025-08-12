import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-detail-modal',
  templateUrl: './reservation-detail-modal.component.html',
  styleUrls: ['./reservation-detail-modal.component.scss']
})
export class ReservationDetailModalComponent {
  reservation: any;

  constructor(
    public dialogRef: MatDialogRef<ReservationDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reservation = data || {};
  }

  close() {
    this.dialogRef.close();
  }
}
