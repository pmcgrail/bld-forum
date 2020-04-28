import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[listMetaPrimary]',
})
export class MetaPrimaryDirective {
  @HostBinding('class.meta-primary') true;

  constructor() {}
}
