import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.background = '#ffcf36';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.background = '';
  }

  constructor(
    private elementRef: ElementRef
  ) { }

}
