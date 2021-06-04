import {AuthenticationGuard} from './authentication.guard';
import {AuthenticationService} from '@reciptor/authentication/data-access';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

describe('AuthenticationGuard', () => {
  const authenticationService: AuthenticationService = {loggedIn$: new BehaviorSubject<boolean>(false)} as unknown as AuthenticationService
  const guard: AuthenticationGuard = new AuthenticationGuard(authenticationService);


  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('guarding routes', () => {
    it('should reject unauthenticated users', () => {
      expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeFalsy();
    });

    it('should accept authenticated users', () => {
      authenticationService.loggedIn$.next(true);
      expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeTruthy();
    });
  });
});
