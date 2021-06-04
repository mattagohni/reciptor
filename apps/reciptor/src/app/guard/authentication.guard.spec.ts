import {AuthenticationGuard} from './authentication.guard';
import {AuthenticationService} from '@reciptor/authentication/data-access';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment} from '@angular/router';

describe('AuthenticationGuard', () => {
  const authenticationService: AuthenticationService = {loggedIn$: new BehaviorSubject<boolean>(false)} as unknown as AuthenticationService
  const guard: AuthenticationGuard = new AuthenticationGuard(authenticationService);


  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  beforeEach(() => {
    authenticationService.loggedIn$.next(false);
  });

  describe('guarding routes with canActivate', () => {
    it('should reject unauthenticated users', () => {
      expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeFalsy();
    });

    it('should accept authenticated users', () => {
      authenticationService.loggedIn$.next(true);
      expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeTruthy();
    });
  });

  describe('guarding routes with canLoad', () => {
    it('should reject unauthenticated users', () => {
      expect(guard.canLoad({} as Route, {} as UrlSegment[])).toBeFalsy();
    });

    it('should accept authenticated users', () => {
      authenticationService.loggedIn$.next(true);
      expect(guard.canLoad({} as Route, {} as UrlSegment[])).toBeTruthy();
    });
  });
});
