import {Component, Directive, OnInit, ElementRef, Renderer2, HostListener} from '@angular/core';

@Directive({
  selector: '[popoverTriggerDir]'
})
export class PopoverTriggerDirective implements OnInit {

  @HostListener('mousedown') mouseDown(event: Event) {
    // event.defaultPrevented;
    console.log('event: ', this.elRef.nativeElement.attributes);
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    console.log('directive - ');
  }
}