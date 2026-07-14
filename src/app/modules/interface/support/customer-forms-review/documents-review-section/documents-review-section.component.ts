import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-documents-review-section',
  templateUrl: './documents-review-section.component.html',
  styleUrls: ['./documents-review-section.component.scss']
})
export class DocumentsReviewSectionComponent {

  @Input()
  form!: FormGroup;

  @Input()
  documentsBaseUrl = '';

  @Input()
  isMancomunado = false;

  openDocument(document: string | null | undefined): void {

    if (!document) {
      return;
    }

    window.open(
      document,
      '_blank'
    );

  }

}
