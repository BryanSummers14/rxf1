import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RaceResult } from 'src/app/interfaces/race-result.interface';
import { RaceResultComponent } from './race-result.component';

const raceResult: RaceResult = {
  number: '1',
  position: '1',
  points: '10000000',
  positionText: '1',
  status: 'Finished',
  grid: '-2',
  laps: '1000',
  Driver: {
    givenName: 'steve',
    familyName: 'something',
    dateOfBirth: '10/10/72',
    driverId: '1',
    permanentNumber: '1',
    nationality: 'nowhere',
    code: 'steeeeeeve',
    url: 'https://fake-url.com',
  },
  Constructor: {
    constructorId: '1',
    url: 'https://fake-url.com',
    name: 'name',
    nationality: 'everywhere',
  },
  FastestLap: {
    rank: '1',
    lap: '2',
    AverageSpeed: {
      speed: '35',
      units: 'kph',
    },
    Time: {
      time: '03:02:01',
    },
  },
};

describe('RaceResultComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceResultComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(RaceResultComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should render a race result`, () => {
    const fixture = TestBed.createComponent(RaceResultComponent);
    const component = fixture.componentInstance;
    component.raceResult = {
      ...raceResult,
    };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const pTags = fixture.debugElement.queryAll(By.css('p'));
      expect(pTags.length).toEqual(5);
    });
  });
});
