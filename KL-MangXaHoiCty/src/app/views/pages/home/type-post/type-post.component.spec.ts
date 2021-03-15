import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePostComponent } from '../type-post/type-post.component';

describe('TypePostComponent', () => {
  let component: TypePostComponent;
  let fixture: ComponentFixture<TypePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
