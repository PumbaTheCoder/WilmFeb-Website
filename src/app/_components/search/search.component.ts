import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { SearchService } from 'src/app/_services/search.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  movies: Movie[];
  searchStatement: string;
  private sub: any;

  constructor(private searchService: SearchService, 
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //this.loadSearchedMovies();
    this.sub = this.route.params.subscribe(params => {
      this.searchStatement = params['searchStr']; // (+) converts string to a number
    });
    this.loadSearchedMovies();
  }

  loadSearchedMovies(){
    console.log(this.searchStatement);
    this.searchService.loadSearchedMovies(this.searchStatement)
    .subscribe( data => {
      this.movies  = JSON.parse(JSON.stringify( data ));

      //przygotowac komunikat na wypadek braku filmow!!!!!!!!!!!!!!!!
   }, error => {
     this.alertify.error("Error " + error.status + " - Couldn't load searched movies");
   });

  }
}
