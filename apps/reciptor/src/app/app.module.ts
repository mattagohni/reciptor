import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiHeaderModule } from '@reciptor/shared/ui-header';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { FlexModule } from '@angular/flex-layout';
import { RECIPTOR_API_URL } from '@reciptor/app-config';
import { AuthInterceptor } from '@reciptor/authentication/data-access';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/', suffix: '.json' },
    { prefix: './assets/i18n/ui-header/', suffix: '.json' },
  ]);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedUiHeaderModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    // ngrx have to be updated `StoreRouterConnectingModule.forRoot()` as soon as routing is used
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    FlexModule,
  ],
  providers: [
    { provide: RECIPTOR_API_URL, useValue: environment.reciptor.baseUrl },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
