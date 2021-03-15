import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChatUserComponent } from './edit-chat-user.component';

describe('EditChatUserComponent', () => {
  let component: EditChatUserComponent;
  let fixture: ComponentFixture<EditChatUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChatUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChatUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
