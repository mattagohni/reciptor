import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController,} from '@angular/common/http/testing';
import {ReciptorAuthenticationRequest} from '../types/authentication.request';
import {ReciptorAuthenticationResponse} from '../types/authentication.response';
import {RECIPTOR_API_URL} from '@reciptor/configuration';
import {cold} from '@nrwl/angular/testing';
import * as moment from 'moment';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClient: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        {
          provide: RECIPTOR_API_URL,
          useValue: 'http://reciptor.mattagohni.de',
        },
      ],
    });
    service = TestBed.inject(AuthenticationService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  describe('login', () => {
    it('should send a authentication request', (done) => {
      const authRequest: ReciptorAuthenticationRequest = {
        username: 'mattagohni',
        password: 'myPassword',
      };
      const expiresAt = Date.now() + 1000;

      const authResponse: ReciptorAuthenticationResponse = {
        token: 'someToken',
        expires: expiresAt,
      };

      // verify the observable is initialized with false
      expect(service.loggedIn$).toBeObservable(cold('a', {a: false}));

      // do login
      service.login(authRequest).subscribe((response) => {
        expect(response.token).toEqual('someToken');
        done();
      });

      const request = httpClient.expectOne('http://reciptor.mattagohni.de/login');

      request.flush(authResponse);
      expect(request.request.method).toEqual('POST');
      httpClient.verify();

      expect(localStorage.getItem('id_token')).toEqual('someToken');
      expect(localStorage.getItem('expires_at')).toEqual(
          expiresAt.toString().valueOf()
      );
      // verify the observable is set to the correct value after succesful login
      expect(service.loggedIn$).toBeObservable(cold('b', {b: true}));
    });

    describe('isLoggedIn$', () => {
      it('should have a value of false when initialized with no token in store', () => {
        const expected = cold('a', {a: false});

        expect(service.loggedIn$).toBeObservable(expected);
      });

      it('should have a value of false when initialized with an expired token', () => {
        localStorage.setItem('id_token', 'someToken');
        localStorage.setItem(
            'expires_at',
            moment(moment.now() - 3600)
                .unix()
                .toString()
        );
        const expected = cold('a', {a: false});

        expect(service.loggedIn$).toBeObservable(expected);
      });

      it('should have a value of true when initialized with a token which is not expired', () => {
        localStorage.setItem('id_token', 'someToken');
        localStorage.setItem(
            'expires_at',
            moment(moment.now() + 3600)
                .unix()
                .toString()
        );
        const expected = cold('a', {a: true});

        expect(service.loggedIn$).toBeObservable(expected);
      });
    });
  });

  describe('logout', () => {
    it('should clear localStorage on logout', () => {
      localStorage.setItem('id_token', 'someToken');
      localStorage.setItem('expires_at', moment(moment.now()).unix().toString());

      service.logout();

      expect(localStorage.getItem('id_token')).toBeNull();
      expect(localStorage.getItem('expires_at')).toBeNull();
    });
  })
});
