import { JokesComponent } from './jokes.component';
import { of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Joke, JokesService } from './jokes.service';
import { By } from '@angular/platform-browser';

class MockJokeService {
    jokes;
    getSingleJoke() {
        return of('FAKE JOKE');
    }
}

describe('Jokes Component', () => {
    let fixture: ComponentFixture<JokesComponent>;
    let jokesComponent: JokesComponent;
    let fakeJokeService: JokesService;

    beforeEach(() => {
        // fakeJokeService = jasmine.createSpyObj('fakeJokeService', ['getSingleJoke']);
        // fakeJokeService.getSingleJoke.and.returnValue(of('FAKE JOKE'));

        // jokesComponent = new JokesComponent(fakeJokeService);

        TestBed.configureTestingModule({
            imports: [],
            declarations: [JokesComponent],
            providers: [JokesService]
        });

        fixture = TestBed.createComponent(JokesComponent);
        jokesComponent = fixture.componentInstance;
        fakeJokeService = TestBed.get(JokesService);
    });

    it('should addd two numbers', () => {
        expect(1 + 1).toEqual(2);
    });

    it('should have the title of "Rajesh Hamal Jokes" when initialized', () => {
        expect(jokesComponent.title).toEqual('Rajesh Hamal Jokes');
    });

    xit('should have the joke property when initialized', () => {
        jokesComponent.ngOnInit();
        expect(jokesComponent.joke).toEqual('FAKE JOKE');

        expect(fakeJokeService.getSingleJoke).toHaveBeenCalled();
        expect(fakeJokeService.getSingleJoke).toHaveBeenCalledTimes(1);
    });

    it('should be able to bind the joke in the template', () => {
        spyOn(fakeJokeService, 'getSingleJoke').and.returnValue(of('FAKE JOKE'));

        const jokesText: HTMLElement = fixture.debugElement.query(By.css('.joke')).nativeElement;

        fixture.detectChanges();

        expect(jokesText.innerText).toEqual('FAKE JOKE');
    });

    it('should be able to get the next joke when the button is pressed using async', async(() => {
        spyOn(fakeJokeService, 'getSingleJoke').and.returnValues(
            of('FAKE JOKE'),
            timer(4000).pipe(map(() => 'FAKE JOKE 2'))
        );
        const jokesText: HTMLElement = fixture.debugElement.query(By.css('.joke')).nativeElement;

        fixture.detectChanges();

        expect(jokesText.innerText).toEqual('FAKE JOKE');

        const button: HTMLElement = fixture.debugElement.query(By.css('.btn')).nativeElement;

        button.click();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(jokesText.innerText).toEqual('FAKE JOKE 2');
        });

    }));

    it('should be able to get the next joke when the button is pressed using fakeAsync', fakeAsync(() => {
        spyOn(fakeJokeService, 'getSingleJoke').and.returnValues(
            of('FAKE JOKE'),
            timer(4000).pipe(map(() => 'FAKE JOKE 2'))
        );

        const jokesText: HTMLElement = fixture.debugElement.query(By.css('.joke')).nativeElement;

        fixture.detectChanges();

        expect(jokesText.innerText).toEqual('FAKE JOKE');

        const button: HTMLElement = fixture.debugElement.query(By.css('.btn')).nativeElement;

        button.click();
        tick(4000);

        fixture.detectChanges();
        expect(jokesText.innerText).toEqual('FAKE JOKE 2');
    }));
});
