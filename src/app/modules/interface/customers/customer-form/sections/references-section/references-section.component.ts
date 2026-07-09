import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-references-section',
  templateUrl: './references-section.component.html',
  styleUrls: ['./references-section.component.scss']
})
export class ReferencesSectionComponent {

  @Input()
  form!: FormGroup;

}