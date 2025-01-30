import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[appFilterTables]'
})
export class FilterTablesDirective {
  @Input('appFilterTables') table!: Table;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);

    this.table.filterGlobal(input.value, 'contains');
  }
}
