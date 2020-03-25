import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { NewComponent } from './new/new.component';
import { PostsComponent } from './posts.component';
import { ViewComponent } from './view/view.component';
import { CommentFormComponent } from '../../components/comment-form/comment-form.component';
import { ListModule } from '../../components/list/list.module';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@NgModule({
  declarations: [
    NewComponent,
    PostsComponent,
    ViewComponent,
    CommentFormComponent,
    PostCardComponent,
  ],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule, ListModule],
})
export class PostsModule {}
