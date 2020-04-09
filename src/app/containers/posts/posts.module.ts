import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PostsRoutingModule } from './posts-routing.module';
import { NewComponent } from './new/new.component';
import { PostsComponent } from './posts.component';
import { ViewComponent } from './view/view.component';
import { CommentFormComponent } from './view/comment-form/comment-form.component';
import { ListModule } from '../../components/list/list.module';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { CommentCardComponent } from 'src/app/components/comment-card/comment-card.component';
import { UserTagComponent } from 'src/app/components/user-tag/user-tag.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ListComponent } from './list/list.component';
import { BackButtonComponent } from 'src/app/components/back-button/back-button.component';
import { CommentListComponent } from './view/comment-list/comment-list.component';

@NgModule({
  declarations: [
    NewComponent,
    PostsComponent,
    ViewComponent,
    CommentFormComponent,
    PostCardComponent,
    CommentCardComponent,
    UserTagComponent,
    PaginationComponent,
    ListComponent,
    BackButtonComponent,
    CommentListComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSnackBarModule,

    ListModule,
  ],
})
export class PostsModule {}
