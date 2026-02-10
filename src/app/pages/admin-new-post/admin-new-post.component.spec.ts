import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewPost } from './admin-new-post';

describe('AdminNewPost', () => {
  let component: AdminNewPost;
  let fixture: ComponentFixture<AdminNewPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
