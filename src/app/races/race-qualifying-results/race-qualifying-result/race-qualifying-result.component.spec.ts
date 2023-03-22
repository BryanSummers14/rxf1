import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QualifyingResult } from 'src/app/interfaces/qualifying-result.interface';
import { QualifyingResultComponent } from './race-qualifying-result.component';

const qualifyingResult: QualifyingResult = {
  number: '1',
  position: '1',
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
  Q1: '01:02:03',
};

describe('QualifyingResultComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualifyingResultComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(QualifyingResultComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should render a qualifying result`, () => {
    const fixture = TestBed.createComponent(QualifyingResultComponent);
    const component = fixture.componentInstance;
    component.qualifyingResult = {
      ...qualifyingResult,
    };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const pTags = fixture.debugElement.queryAll(By.css('p'));
      expect(pTags.length).toEqual(3);
    });
  });
});
