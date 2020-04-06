import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComponent } from './new/new.component';
import { AuthGuard } from 'src/app/providers/auth.guard';
import { PostsComponent } from './posts.component';
import { ViewComponent } from './view/view.component';
import { NavResolver } from 'src/app/providers/nav.resolver';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard],
    resolve: {
      _: NavResolver,
    },
  },
  {
    path: 'posts/new',
    component: NewComponent,
    canActivate: [AuthGuard],
    resolve: {
      _: NavResolver,
    },
  },
  {
    path: 'posts/:category',
    component: ListComponent,
    canActivate: [AuthGuard],
    resolve: {
      _: NavResolver,
    },
  },
  {
    path: 'posts/view/:postId',
    component: ViewComponent,
    canActivate: [AuthGuard],
    resolve: {
      _: NavResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
