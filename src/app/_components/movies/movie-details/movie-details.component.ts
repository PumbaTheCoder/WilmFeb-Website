import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MovieDetail } from 'src/app/_models/movieDetail';
import { MovieService } from 'src/app/_services/movie.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CommentAdd } from 'src/app/_models/commentAdd';
import { Comments } from 'src/app/_models/comments';
import * as cloneDeep from 'lodash/cloneDeep';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MarkAdd } from 'src/app/_models/markAdd';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieDetail: MovieDetail;
  safeTrailerURL: SafeResourceUrl;
  userComment: string;
  addComm: CommentAdd;
  testComm: string;
  currentRate = 0;
  loadComments: Boolean = true;
  newMark: MarkAdd;
  movieComments: Array<Comments>;
  userMarkChecker: boolean = false;
  isInQueue: boolean = false;



  link: string = "https://video-http.media-imdb.com/MV5BZDQ3ZWZlNWUtYTVmYS00Njc3LWEyYjQtM2FkZWFlMjkyOGMxXkExMV5BbXA0XkFpbWRiLWV0cy10cmFuc2NvZGU@.mp4?Expires=1547485244&Signature=dmRQRdQU5uO4KpM9o71Uc48JrUbXJXro4G-BZYLi2cD-pnbCbTv6kXndmMX7pC~3RwfL-0yzCZfMdBGnVtsfVN0JrQcrlbOtD1yfJjFl~0ndlJyaJKGgl2cE3AM12O3LiEjcl2AxNj7lP7RSsqqTX3SD0Dt-yZJEQ3DVdXsDIu4_&Key-Pair-Id=APKAILW5I44IHKUN2DYA";




  constructor(private movieService: MovieService, 
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              public sanitizer: DomSanitizer,
              private ref: ChangeDetectorRef) {
                this.ref.markForCheck();
              }

  ngOnInit() {  
    this.loadMovieDetail();
    this.currentRate = this.movieDetail.userMark;
    this.movieComments = this.movieDetail.movieComments;
    //sprawdza czy film jest juz obejrzany - czy jest oceniony
    if(this.currentRate > 0){
      this.userMarkChecker = true;
    }
    //sprawdza czy film jest juz w kolejce
    this.checkIfMovieIsInQueue();
  }

  checkIfMovieIsInQueue(){
    this.movieService.checkIfMovieInQueue(this.movieDetail.idMovie)
    .subscribe( data => {
      this.isInQueue = JSON.parse(JSON.stringify( data ));
   }, error => {
     this.alertify.error("Error " + error.status + " - Couldn't check user queue");
   });

  }

  sendUserMark(nMark: number){
    this.movieDetail.userMark = nMark;  
    this.newMark = { idMovie: this.movieDetail.idMovie, mark: nMark};

    this.movieService.addMark(this.newMark).subscribe( next => {
      this.alertify.success("Movie rated");
      this.getAverageMark();
      this.userMarkChecker = true;
      this.isInQueue = false;
    }, error => {
      this.alertify.error(error);
    })    
  }
 
  addToQueue(){

    this.movieService.addToQueue(this.movieDetail.idMovie).subscribe( next => {
      this.alertify.success("Movie added to your queue");
      this.isInQueue = true;
    }, error => {
      this.alertify.error(error);
    })
  }

  getAverageMark(){
    this.movieService.getMovieAverageMark(this.movieDetail.idMovie)
    .subscribe( data => {
      this.movieDetail.globalMark = JSON.parse(JSON.stringify( data ));
   }, error => {
     this.alertify.error("Error " + error.status + " - Couldn't load refreshed average mark");
   });
  }

  addComment(){

    if(this.userComment){
      this.addComm = { idMovie: this.movieDetail.idMovie, comment: this.userComment};

      this.movieService.addComment(this.addComm).subscribe( next => {
        this.alertify.success("Comment added");
        this.userComment = "";
        this.loadMovieComments();
      }, error => {
        this.alertify.error(error);
      })
      
    }else{
      this.alertify.warning("Your comment can't be empty");
    }    
    this.ref.markForCheck();  
  }

  loadMovieComments(){
    this.movieComments = null;
    this.movieService.getMovieComments(this.movieDetail.idMovie)
    .subscribe( data => {
      let tempComm = JSON.parse(JSON.stringify( data ));
      this.createCopy(tempComm);
      this.ref.markForCheck();
   }, error => {
     this.alertify.error("Error " + error.status + " - Couldn't load movie comments");
   });
    
    this.ref.markForCheck();
  }
  
  createCopy(list: any){
    delete(this.movieComments);
    this.movieComments = Object.assign([], list); 
  }

  loadMovieDetail(){
    this.route.data.subscribe(data => {
      this.movieDetail = data['movieDetail'];
  })
    this.safeTrailerURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.movieDetail.trailer);
    //this.safeTrailerURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
  }
  
}
