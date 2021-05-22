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

  it('should be able to determine a logged in user', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn((key) => key == 'id_token'? 'someToken': `${moment.now() + 3600}`);

    expect(app.isLoggedIn()).toBeTruthy();
  });

  it('should be able to determine a not logged in user, when expired', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn((key) => key == 'id_token'? 'someToken': `${moment.now() - 3600}`);

    expect(app.isLoggedIn()).toBeFalsy();
  });
});
