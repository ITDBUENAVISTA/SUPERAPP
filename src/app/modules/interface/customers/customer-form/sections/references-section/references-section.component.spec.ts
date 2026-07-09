import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesSectionComponent } from './references-section.component';

describe('ReferencesSectionComponent', () => {
  let component: ReferencesSectionComponent;
  let fixture: ComponentFixture<ReferencesSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferencesSectionComponent]
    });
    fixture = TestBed.createComponent(ReferencesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
