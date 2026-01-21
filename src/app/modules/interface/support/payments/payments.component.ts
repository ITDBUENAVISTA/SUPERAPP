import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ListVounchers } from 'src/app/core/interfaces/vounchers/vounchers.interfaces';
import { VounchersService } from 'src/app/core/services/vounchers.service';
import { environment } from 'src/environments/environment';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  @ViewChild('tabla') tabla!: Table;

  public urlServer = environment.urlComprobantes;

  statusOptions = [
    { label: 'CARGADO', value: 'CARGADO', icon: 'task_alt', class: 'text-success' },
    { label: 'SIN REVISAR', value: 'SIN REVISAR', icon: 'error', class: 'text-danger' }
  ];

  vounchers: ListVounchers[] = [];
  loadedVounchers: boolean = false;

  constructor(
    private readonly vounchersService: VounchersService
  ){}

  ngOnInit(){
    this.loadAllVounchers();
  }

  loadAllVounchers(): void {
    this.vounchersService.allVounchers().subscribe({
      next: (resp) => {
        console.log(resp.data);
        this.vounchers = (resp.data as ListVounchers[]).map(
          (v: ListVounchers & { _originalComment?: string }) => ({
            ...v,
            _originalComment: v.comment
          })
        );
      },
      complete: () => {
        this.loadedVounchers = true;
      }
    });
  }



  openVouncher(file: string) {
    const url = `${this.urlServer}${file}`;
    window.open(url, '_blank');
  }

  changeStatusVoucher(id: string, status: string){
    const newStatus = status === 'SIN REVISAR' ? 'CARGADO' : 'SIN REVISAR';
    this.vounchersService.changeStatusVoucher(id, newStatus).subscribe({
      next: () => {
        this.loadAllVounchers();
      }
    })
  }

  onStatusFilterChange(value: string | null): void {
    if (value) {
      this.tabla.filter(value, 'status', 'equals');
    } else {
      this.tabla.filter(null, 'status', 'equals'); // limpia SOLO estado
    }
  }

  onCommentKeydown(event: KeyboardEvent, vouncher: any): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      (event.target as HTMLTextAreaElement).blur();
    }
  }


  onCommentBlur(vouncher: any): void {
    if (vouncher.comment === vouncher._originalComment) {
      return; // no cambios
    }

    this.vounchersService
      .updateCommentVoucher(vouncher._id, vouncher.comment)
      .subscribe({
        next: () => {
          vouncher._originalComment = vouncher.comment;
        },
        error: () => {
          // rollback silencioso
          vouncher.comment = vouncher._originalComment;
        }
      });
  }


  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  getActions(vouncher: any) {
    return [
      {
        label: 'Cambiar estado',
        icon: 'pi pi-refresh',
        command: () =>
          this.changeStatusVoucher(vouncher._id, vouncher.status)
      },
      {
        label: 'Ver comprobante',
        icon: 'pi pi-external-link',
        command: () =>
          this.openVouncher(vouncher.file)
      }
    ];
  }

  exportToExcel(): void {
    const data = this.tabla.filteredValue ?? this.vounchers;

    const exportData = data.map(v => ({
      Fecha: v.date ? new Date(v.date).toLocaleDateString() : '',
      Nombre: v.person,
      Lote: v.lot,
      Valor: v.number,
      Estado: v.status,
      Concepto: v.concept,
      Comentarios: v.comment || ''
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Pagos': worksheet },
      SheetNames: ['Pagos']
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    this.saveExcelFile(excelBuffer, 'pagos');
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data = new Blob(
      [buffer],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
    );

    saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }

}
