import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[listSecondary]',
})
export class SecondaryDirective {
  @HostBinding('class.secondary') true;

  constructor() {}
}
