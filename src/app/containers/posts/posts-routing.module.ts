import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComponent } from './new/new.component';
import { AuthGuard } from 'src/app/providers/auth.guard';

const routes: Routes = [
  {
    path: 'posts/new',
    component: NewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
