import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { driversReducer } from './reducers/drivers.reducer';
import { racesReducer } from './reducers/races.reducer';
import { seasonsReducer } from './reducers/seasons.reducer';
import { StateKeys } from './state-keys';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { F1SeasonDriversEffect } from './effects/f1-season-drivers.effect';
import { F1SeasonRacesEffect } from './effects/f1-season-races.effect';
import { F1SeasonsEffect } from './effects/f1-seasons.effect';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        EffectsModule.forRoot([
          F1SeasonsEffect,
          F1SeasonDriversEffect,
          F1SeasonRacesEffect,
        ]),
        StoreModule.forRoot({
          [StateKeys.SEASONS]: seasonsReducer,
          [StateKeys.DRIVERS]: driversReducer,
          [StateKeys.RACES]: racesReducer,
        }),
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render seasons 2018 - 2022', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const seasonTitles = fixture.debugElement.queryAll(
        By.css('.season-title')
      );
      expect(seasonTitles.length).toEqual(4);
      const seasonTitleText = seasonTitles.map((seasonTitle) => {
        const seasonTitleElem: HTMLSpanElement = seasonTitle.nativeElement;
        return seasonTitleElem.innerText.trim();
      });
      expect(seasonTitleText).toEqual(['2018', '2019', '2020', '2021', '2022']);
    });
  });
});
