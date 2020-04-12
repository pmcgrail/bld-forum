import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base/base.component';
import { ItemComponent } from './item/item.component';
import { NumberIconComponent } from '../number-icon/number-icon.component';

@NgModule({
  declarations: [BaseComponent, ItemComponent, NumberIconComponent],
  imports: [CommonModule],
  exports: [BaseComponent, ItemComponent],
})
export class ListModule {}
