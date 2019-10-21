import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./_components/home/home.component";
import { RegisterComponent } from "./_components/register/register.component";
import { AuthGuard } from "./_guards/auth.guard";
import { FriendsComponent } from "./_components/friends/friends.component";
import { RecommendedComponent } from "./_components/recommended/recommended.component";
import { QueueComponent } from "./_components/queue/queue.component";
import { WatchedComponent } from './_components/watched/watched.component';
import { MovieListComponent } from './_components/movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './_components/movies/movie-details/movie-details.component';
import { MovieDetailResolver } from './_resolvers/movie-detail-resolver';
import { QueueMovieCardComponent } from './_components/queue/queue-movie-card/queue-movie-card.component';
import { SearchComponent } from './_components/search/search.component';
import { UserProfileComponent } from './_components/friends/user-profile/user-profile.component';
import { UsersListComponent } from './_components/friends/users-list/users-list.component';



const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "movies", component: MovieListComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [  
      { path: "movies/:id", component: MovieDetailsComponent, resolve: {movieDetail: MovieDetailResolver} } , 
      { path: "watched", component: WatchedComponent },
      { path: "queue", component: QueueComponent },
      { path: "recommended", component: RecommendedComponent },
      { path: "friends", component: FriendsComponent },
      { path: "search/:searchStr", component: SearchComponent },
      { path: "searchUser/userProfile/:searchedLogin", component: UserProfileComponent },
      { path: "searchUser", component: UsersListComponent }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [
  HomeComponent,
  MovieListComponent,
  RegisterComponent,
  WatchedComponent,
  QueueComponent,
  RecommendedComponent,
  FriendsComponent
];
