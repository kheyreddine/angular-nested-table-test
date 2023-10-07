import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizeColumn]',
  standalone: true,
})
export class ResizeColumnDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    const th = this.el.nativeElement;
    const startingWidth = th.offsetWidth;
    const onMouseMove = (moveEvent: MouseEvent) => {
      const offset = moveEvent.clientX - th.getBoundingClientRect().left;
      th.style.width = startingWidth + offset + 'px';
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
