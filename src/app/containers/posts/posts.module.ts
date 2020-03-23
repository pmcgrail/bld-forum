import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { NewComponent } from './new/new.component';
import { PostsComponent } from './posts.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [NewComponent, PostsComponent, ViewComponent],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule],
})
export class PostsModule {}
