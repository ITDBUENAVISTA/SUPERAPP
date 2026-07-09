import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-beneficiary-section',
  templateUrl: './beneficiary-section.component.html',
  styleUrls: ['./beneficiary-section.component.scss']
})
export class BeneficiarySectionComponent {

  @Input()
  form!: FormGroup;

}