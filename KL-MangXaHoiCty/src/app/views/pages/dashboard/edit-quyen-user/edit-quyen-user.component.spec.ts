import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuyenUserComponent } from './edit-quyen-user.component';

describe('EditQuyenUserComponent', () => {
  let component: EditQuyenUserComponent;
  let fixture: ComponentFixture<EditQuyenUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuyenUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuyenUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
