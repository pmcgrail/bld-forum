import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { NavResolver } from './providers/nav.resolver';
import { AuthGuard } from './providers';
import { AboutComponent } from './containers/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { _: NavResolver } },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: { _: NavResolver },
  },
  {
    path: 'about',
    component: AboutComponent,
    resolve: { _: NavResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [NavResolver],
})
export class AppRoutingModule {}
