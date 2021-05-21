import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ReciptorAuthenticationRequest} from '../types/authentication.request';
import {ReciptorAuthenticationResponse} from '../types/authentication.response';
import {RECIPTOR_API_URL} from '@reciptor/app-config';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    jest.spyOn(window.localStorage.__proto__, 'removeItem');
    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.removeItem = jest.fn();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        {provide: RECIPTOR_API_URL, useValue: 'http://reciptor.mattagohni.de'}
      ]
    });
    service = TestBed.inject(AuthenticationService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should send a authentication request', (done) => {
    const authRequest: ReciptorAuthenticationRequest = {username: 'mattagohni', password: 'myPassword'};
    const expiresAt = Date.now() + 1000;

    const authResponse: ReciptorAuthenticationResponse = {token: 'someToken', expires: expiresAt};

    service.login(authRequest).subscribe(
      response => {
        expect(response.token).toEqual('someToken');
        done();
      }
    )

    const request = httpClient.expectOne('http://reciptor.mattagohni.de/login');

    request.flush(authResponse);
    expect(request.request.method).toEqual('POST');
    httpClient.verify();

    expect(localStorage.setItem).toBeCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'id_token', 'someToken');
    expect(localStorage.setItem).toHaveBeenNthCalledWith(2, 'expires_at', expiresAt.toString().valueOf());
  });

  it('should clear localStorage on logout', () => {
    service.logout();

    expect(localStorage.removeItem).toBeCalledTimes(2)
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(1, 'id_token');
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(2, 'expires_at');
  });
});
