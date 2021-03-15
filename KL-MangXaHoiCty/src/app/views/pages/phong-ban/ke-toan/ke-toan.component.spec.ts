import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeToanComponent } from './ke-toan.component';

describe('KeToanComponent', () => {
  let component: KeToanComponent;
  let fixture: ComponentFixture<KeToanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeToanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
