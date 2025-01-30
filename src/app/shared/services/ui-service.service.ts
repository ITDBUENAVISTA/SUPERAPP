import { EventEmitter, Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  headerClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  alertaSuccess(text: string, title?: string) {
    Swal.fire({
      title: title || 'Exito',
      text,
      position: "top-end",
      showConfirmButton: false,
      icon: 'success'
    });
  };

  alertaError(text: string,title?: string) {
    Swal.fire({
      title: title || 'Error',
      text,
      position: "top-end",
      showConfirmButton: false,
      icon: 'error'
    });
  };


}
