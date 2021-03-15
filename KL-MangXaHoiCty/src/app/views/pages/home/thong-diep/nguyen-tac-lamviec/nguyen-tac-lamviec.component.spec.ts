import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NguyenTacLamviecComponent } from './nguyen-tac-lamviec.component';

describe('NguyenTacLamviecComponent', () => {
  let component: NguyenTacLamviecComponent;
  let fixture: ComponentFixture<NguyenTacLamviecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NguyenTacLamviecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NguyenTacLamviecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
