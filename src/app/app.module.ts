import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { F1SeasonDriversEffect } from './effects/f1-season-drivers.effect';
import { F1SeasonsEffect } from './effects/f1-seasons.effect';
import { driversReducer } from './reducers/drivers.reducer';
import { seasonsReducer } from './reducers/seasons.reducer';
import { F1SeasonRacesEffect } from './effects/f1-season-races.effect';
import { racesReducer } from './reducers/races.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StateKeys } from './state-keys';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
