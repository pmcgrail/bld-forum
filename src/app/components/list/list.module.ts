import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base/base.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [BaseComponent, ItemComponent],
  imports: [CommonModule],
  exports: [BaseComponent, ItemComponent],
})
export class ListModule {}
