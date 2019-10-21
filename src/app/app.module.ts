import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthoristaionService } from './_services/authorisation.service';
import { routingComponents, AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { WatchedComponent } from './_components/watched/watched.component';
import { QueueComponent } from './_components/queue/queue.component';
import { RecommendedComponent } from './_components/recommended/recommended.component';
import { FriendsComponent } from './_components/friends/friends.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_services/TokenInterceptor';
import { MovieListComponent } from './_components/movies/movie-list/movie-list.component';
import { MovieCardComponent } from './_components/movies/movie-card/movie-card.component';
import { MovieDetailsComponent } from './_components/movies/movie-details/movie-details.component';
import { MovieCommentCardComponent } from './_components/movies/movie-comment-card/movie-comment-card.component';
import { MovieDetailResolver } from './_resolvers/movie-detail-resolver';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { QueueService } from './_services/queue.service';
import { QueueMovieCardComponent } from './_components/queue/queue-movie-card/queue-movie-card.component';
import { WatchedCardComponent } from './_components/watched/watched-card/watched-card.component';
import { SearchComponent } from './_components/search/search.component';
import { UserProfileComponent } from './_components/friends/user-profile/user-profile.component';
import { FriendMovieCardComponent } from './_components/friends/friend-movie-card/friend-movie-card.component';
import { FriendInfoCardComponent } from './_components/friends/friend-info-card/friend-info-card.component';
import { UsersListComponent } from './_components/friends/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    WatchedComponent,
    QueueComponent,
    RecommendedComponent,
    FriendsComponent,
    MovieListComponent,
    MovieCardComponent,
    MovieDetailsComponent,
    MovieCommentCardComponent,
    QueueMovieCardComponent,
    WatchedCardComponent,
    SearchComponent,
    UserProfileComponent,
    FriendMovieCardComponent,
    FriendInfoCardComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PaginationModule.forRoot()
  ],
  providers: [
    AuthoristaionService,
    AlertifyService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    },
    MovieDetailResolver,
    QueueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
