import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChatUserComponent } from './delete-chat-user.component';

describe('DeleteChatUserComponent', () => {
  let component: DeleteChatUserComponent;
  let fixture: ComponentFixture<DeleteChatUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteChatUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteChatUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
