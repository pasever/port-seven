import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[popup]',
    exportAs: 'popup'
})
export class PopupDirective {

  @Input() message;

  constructor(
      private elementRef: ElementRef,
  ) {
    console.log('Directive bound');
    console.log(this.elementRef);
  }

  @HostListener('click') displayMessage = () => alert(this.message);
}
