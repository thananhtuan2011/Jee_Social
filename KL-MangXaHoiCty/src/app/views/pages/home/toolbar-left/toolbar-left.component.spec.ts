import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarLeftComponent } from './toolbar-left.component';
import {FormsModule} from '@angular/forms';


describe('ToolbarLeftComponent', () => {
  let component: ToolbarLeftComponent;
  let fixture: ComponentFixture<ToolbarLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
