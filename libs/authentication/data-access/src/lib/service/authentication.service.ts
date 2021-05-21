import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReciptorAuthenticationRequest} from '../types/authentication.request';
import {Observable} from 'rxjs';
import {ReciptorAuthenticationResponse} from '../types/authentication.response';
import {shareReplay, tap} from 'rxjs/operators';
import {RECIPTOR_API_URL} from '@reciptor/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, @Inject(RECIPTOR_API_URL) private apiUrl: string) {
  }

  private saveToSession = (authResponse: ReciptorAuthenticationResponse) => {
    localStorage.setItem('id_token', authResponse.token);
    localStorage.setItem('expires_at', JSON.stringify(authResponse.expires));
  };

  login(authRequest: ReciptorAuthenticationRequest): Observable<ReciptorAuthenticationResponse> {
    return this.httpClient.post<ReciptorAuthenticationResponse>(this.apiUrl + '/login', authRequest).pipe(
      tap(this.saveToSession),
      shareReplay()
    )
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
