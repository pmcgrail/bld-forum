import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[listMetaSecondary]',
})
export class MetaSecondaryDirective {
  @HostBinding('class.meta-secondary') true;

  constructor() {}
}
