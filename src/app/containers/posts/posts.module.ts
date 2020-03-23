import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [NewComponent],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule],
})
export class PostsModule {}
