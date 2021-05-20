import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReciptorAuthenticationRequest} from '../types/authentication.request';
import {Observable} from 'rxjs';
import {ReciptorAuthenticationResponse} from '../types/authentication.response';
import {RECIPTOR_API_CONFIG} from '../../../../feature/src/lib/tokens/injection-tokens';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private saveToSession = (authResponse: ReciptorAuthenticationResponse) => {
    localStorage.setItem('id_token', authResponse.token);
    localStorage.setItem('expires_at', JSON.stringify(authResponse.expiresAt.valueOf()));
  };

  constructor(private httpClient: HttpClient, @Inject(RECIPTOR_API_CONFIG) private config: any) {
  }

  login(authRequest: ReciptorAuthenticationRequest): Observable<ReciptorAuthenticationResponse> {
    return this.httpClient.post<ReciptorAuthenticationResponse>(this.config.baseUrl + '/login', authRequest).pipe(
      tap(this.saveToSession),
      shareReplay()
    )
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
