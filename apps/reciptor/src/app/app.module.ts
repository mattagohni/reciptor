import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedMaterialModule} from '@reciptor/shared/material';
import {SharedUiHeaderModule} from '@reciptor/shared/ui-header';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    SharedUiHeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
