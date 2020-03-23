import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComponent } from './new/new.component';
import { AuthGuard } from 'src/app/providers/auth.guard';
import { PostsComponent } from './posts.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/new',
    component: NewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'posts/:postId',
    component: ViewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
