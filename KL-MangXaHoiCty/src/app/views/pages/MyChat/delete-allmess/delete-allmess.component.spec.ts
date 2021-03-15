import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllmessComponent } from './delete-allmess.component';

describe('DeleteAllmessComponent', () => {
  let component: DeleteAllmessComponent;
  let fixture: ComponentFixture<DeleteAllmessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAllmessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAllmessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
