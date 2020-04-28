import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[listPrimary]',
})
export class PrimaryDirective {
  @HostBinding('class.primary') true;

  constructor() {}
}
