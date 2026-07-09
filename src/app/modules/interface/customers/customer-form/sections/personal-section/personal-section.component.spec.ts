import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSectionComponent } from './personal-section.component';

describe('PersonalSectionComponent', () => {
  let component: PersonalSectionComponent;
  let fixture: ComponentFixture<PersonalSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalSectionComponent]
    });
    fixture = TestBed.createComponent(PersonalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
