import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base/base.component';
import { ItemComponent } from './item/item.component';
import { ItemTextComponent } from './item-text/item-text.component';
import {
  PrimaryDirective,
  SecondaryDirective,
  MetaPrimaryDirective,
  MetaSecondaryDirective,
} from './item-text/directives';

@NgModule({
  declarations: [
    BaseComponent,
    ItemComponent,
    ItemTextComponent,
    PrimaryDirective,
    SecondaryDirective,
    MetaPrimaryDirective,
    MetaSecondaryDirective,
  ],
  imports: [CommonModule],
  exports: [
    BaseComponent,
    ItemComponent,
    ItemTextComponent,
    PrimaryDirective,
    SecondaryDirective,
    MetaPrimaryDirective,
    MetaSecondaryDirective,
  ],
})
export class ListModule {}
