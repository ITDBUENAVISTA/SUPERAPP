import { Customer } from 'src/app/core/interfaces/customers/customers.interface';

import { Component, Input, OnInit  } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-purchase-section',
  templateUrl: './purchase-section.component.html',
  styleUrls: ['./purchase-section.component.scss']
})
export class PurchaseSectionComponent {

  @Input()
  form!: FormGroup;

  @Input()
  projects: Customer[] = [];

  ngOnInit(): void {

    this.form.get('lot')?.valueChanges.subscribe(batch => {

      const project = this.projects.find(p => p.batch === batch);

      if (!project) return;

      this.form.patchValue({
        financing_term: project.quotas.toString(),
        customer_id: project._id
      });

    });

  }

}