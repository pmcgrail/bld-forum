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
import { CommentCardComponent } from 'src/app/components/comment-card/comment-card.component';
import { UserTagComponent } from 'src/app/components/user-tag/user-tag.component';

@NgModule({
  declarations: [
    NewComponent,
    PostsComponent,
    ViewComponent,
    CommentFormComponent,
    PostCardComponent,
    CommentCardComponent,
    UserTagComponent,
  ],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule, ListModule],
})
export class PostsModule {}
