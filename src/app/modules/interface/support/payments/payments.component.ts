import { Component, OnInit } from '@angular/core';
import { ListVounchers } from 'src/app/core/interfaces/vounchers/vounchers.interfaces';
import { VounchersService } from 'src/app/core/services/vounchers.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  vounchers: ListVounchers[] = [];
  loadedVounchers: boolean = false;

  constructor(
    private readonly vounchersService: VounchersService
  ){}

  ngOnInit(){
    this.loadAllVounchers();
  }

  loadAllVounchers(){
    this.vounchersService.allVounchers().subscribe({
      next: (resp) => {
        this.vounchers = resp.data;
      },
      complete: () => {
        this.loadedVounchers = true;
      }
    })
  }

  openVouncher(file: string) {
    const url = `http://localhost:8002/comprobantes/${file}`;
    window.open(url, '_blank');
  }

  changeStatusVoucher(id: string, status: string){
    const newStatus = status === 'CARGADO' ? 'AUDITADO' : 'CARGADO';
    this.vounchersService.changeStatusVoucher(id, newStatus).subscribe({
      next: () => {
        this.loadAllVounchers();
      }
    })
  }


}
