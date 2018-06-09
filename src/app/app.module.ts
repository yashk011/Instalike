import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FollowingComponent } from './following/following.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';
import  {RouteGuard} from './auth/rout-guard';
import { NotificationComponent } from './notification/notification.component';
import {NotificationService} from './shared/notification.shared';
import {MyFireServices} from './shared/myfire.services';
import {UserServices} from './shared/user.services';
import { PostComponent } from './shared/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPostsComponent,
    FavoritesComponent,
    FollowingComponent,
    MyPostsComponent,
    SignUpComponent,
    LogoutComponent,
    LoginComponent,
    HomeComponent,
    NotificationComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RouteGuard , NotificationService, MyFireServices ,UserServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
