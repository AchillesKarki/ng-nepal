import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Joke {
    joke: string;
}

@Injectable({
    providedIn: 'root'
})

export class JokesService {
    jokes: string[] = [
        'RAJESH HAMAL can divide by zero.',
        'There is no such thing as global warming.  RAJESH HAMAL was cold, so he turned the sun up.',
        'Ghosts sit around the campfire and tell RAJESH HAMAL stories.',
        'Time and tide waits for no one but RAJESH HAMAL.',
        `One day Rajnikanth, Spiderman , Superman,
         Batman, Bruce lee and Chuck Norris visited Rajesh dai’s house … it was an auspicious day of GURU PURNIMA !!!`,
        'RAJESH HAMAL can race with a bullet and win.',
        'RAJESH HAMAL can answer a missed call.',
        'Rajesh Hamal inserts his Visiting Card in Any ATM & Collects Cash.',
        'Ghosts sit around the campfire and tell RAJESH HAMAL stories.',
        'Rajesh Hamal kills two stones with one bird.'
    ];

    /**
     * returns a random joke
     */
    getSingleJoke() {
        return of(this.jokes[Math.floor(Math.random() * this.jokes.length)]);
    }
}
