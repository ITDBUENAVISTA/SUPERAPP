import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsReviewSectionComponent } from './documents-review-section.component';

describe('DocumentsReviewSectionComponent', () => {
  let component: DocumentsReviewSectionComponent;
  let fixture: ComponentFixture<DocumentsReviewSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsReviewSectionComponent]
    });
    fixture = TestBed.createComponent(DocumentsReviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
