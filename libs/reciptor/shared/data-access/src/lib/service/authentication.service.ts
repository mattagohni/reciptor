import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReciptorAuthenticationRequest } from '../types/authentication.request';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReciptorAuthenticationResponse } from '../types/authentication.response';
import { shareReplay, tap } from 'rxjs/operators';
import { RECIPTOR_API_URL } from '@reciptor/configuration';
import * as moment from 'moment';
import { ReciptorRegistrationResponse } from '../types/registration.response';
import { ReciptorRegistrationRequest } from '../types/registration.request';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedIn$: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient,
    @Inject(RECIPTOR_API_URL) private apiUrl: string
  ) {
    this.loggedIn$ = new BehaviorSubject<boolean>(
      AuthenticationService.hasValidToken()
    );
  }

  private static hasValidToken(): boolean {
    const token = localStorage.getItem('id_token');
    const expires = localStorage.getItem('expires_at');

    const hasToken = token !== null && token !== undefined && token.length > 0;
    const isExpired =
      expires !== null &&
      expires !== undefined &&
      moment().isBefore(moment(parseInt(expires)));
    return hasToken && !isExpired;
  }

  private saveToSession = (
    authResponse: ReciptorAuthenticationResponse | ReciptorRegistrationResponse
  ) => {
    localStorage.setItem('id_token', authResponse.token);
    localStorage.setItem('expires_at', JSON.stringify(authResponse.expires));
  };

  login(
    authRequest: ReciptorAuthenticationRequest
  ): Observable<ReciptorAuthenticationResponse> {
    return this.httpClient
      .post<ReciptorAuthenticationResponse>(this.apiUrl + '/login', authRequest)
      .pipe(
        tap(this.saveToSession),
        tap(() => this.loggedIn$.next(true)),
        shareReplay()
      );
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.loggedIn$.next(false);
  }

  register(
    registrationRequest: ReciptorRegistrationRequest
  ): Observable<ReciptorRegistrationResponse> {
    return this.httpClient
      .post<ReciptorRegistrationResponse>(
        this.apiUrl + '/register',
        registrationRequest
      )
      .pipe(
        tap(this.saveToSession),
        tap(() => this.loggedIn$.next(true)),
        shareReplay()
      );
  }
}
