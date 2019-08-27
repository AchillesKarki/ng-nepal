import { Component, OnInit } from '@angular/core';
import { JokesService } from './jokes.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss']
})
export class JokesComponent implements OnInit {
  title = 'Rajesh Hamal Jokes';
  joke;

  constructor(private jokeService: JokesService) { }

  ngOnInit() {
    this.getNextJoke();
  }

  /**
   * gets the next joke from the joke service
   */
  getNextJoke() {
    this.jokeService.getSingleJoke().subscribe(joke => {
      this.joke = joke;
    });
  }

}
