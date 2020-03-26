import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { environment } from '../environments/environment';
import { ProfileComponent } from './containers/profile/profile.component';
import { PostsModule } from './containers/posts/posts.module';
import { AuthGuard } from './providers/auth.guard';
import { HeaderComponent } from './components/header/header.component';

const config = {
  ...environment.firebaseConfig,
};

@NgModule({
  declarations: [AppComponent, HomeComponent, ProfileComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,

    PostsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
