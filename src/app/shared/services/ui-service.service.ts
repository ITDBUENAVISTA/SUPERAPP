import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  headerClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
