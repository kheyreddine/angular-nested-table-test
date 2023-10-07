import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizeColumn]',
  standalone: true,
})
export class ResizeColumnDirective {
  // Constructor with dependency injection of ElementRef and Renderer2
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // HostListener to handle mouse down event
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    // Prevent default behavior of mouse down event
    event.preventDefault();

    // Get the native element that the directive is applied to
    const th = this.el.nativeElement;

    // Get the initial width of the element
    const startingWidth = th.offsetWidth;

    // Define function to handle mouse move event
    const onMouseMove = (moveEvent: MouseEvent) => {
      // Calculate the offset of the mouse pointer from the left edge of the element
      const offset = moveEvent.clientX - th.getBoundingClientRect().left;

      // Set the new width of the element based on the initial width and mouse offset
      th.style.width = startingWidth + offset + 'px';
    };

    // Define function to handle mouse up event
    const onMouseUp = () => {
      // Remove event listeners for mouse move and mouse up
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // Add event listeners for mouse move and mouse up
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
