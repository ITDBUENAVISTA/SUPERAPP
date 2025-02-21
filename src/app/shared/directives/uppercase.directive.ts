import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const sanitizedValue = value.replace(/\s+/g, '').toUpperCase();
    if (sanitizedValue !== value) {
      this.renderer.setProperty(this.el.nativeElement, 'value', sanitizedValue);
      this.el.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

}
