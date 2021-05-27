import {AppComponent} from './app.component';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

describe('AppComponent', () => {
  let app;
  const translationService = {setDefaultLang: jest.fn(), use: jest.fn()} as unknown as TranslateService

  beforeEach(() => {
    app = new AppComponent(translationService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'reciptor'`, () => {
    expect(app.title).toEqual('reciptor');
  });
});
