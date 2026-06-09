import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmailComponent } from './profile-email.component';

describe('ProfileEmailComponent', () => {
  let component: ProfileEmailComponent;
  let fixture: ComponentFixture<ProfileEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEmailComponent]
    });
    fixture = TestBed.createComponent(ProfileEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
