import {AuthenticationGuard} from './authentication.guard';
import {AuthenticationService} from '@reciptor/shared/data-access';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment} from '@angular/router';

describe('AuthenticationGuard', () => {
  const authenticationService: AuthenticationService = {loggedIn$: new BehaviorSubject<boolean>(false)} as unknown as AuthenticationService
  const router: Router = {parseUrl: jest.fn()} as unknown as Router
  const guard: AuthenticationGuard = new AuthenticationGuard(authenticationService, router);


  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  beforeEach(() => {
    authenticationService.loggedIn$.next(false);
  });

  describe('guarding routes with canActivate', () => {
    it('should reject unauthenticated users', () => {
      expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).not.toBeTruthy();
      expect(router.parseUrl).toHaveBeenCalledWith('/login');
    });

    it('should accept authenticated users', () => {
      authenticationService.loggedIn$.next(true);
      expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeTruthy();
    });
  });

  describe('guarding routes with canLoad', () => {
    it('should reject unauthenticated users', () => {
      expect(guard.canLoad({} as Route, {} as UrlSegment[])).not.toBeTruthy();
      expect(router.parseUrl).toHaveBeenCalledWith('/login');
    });

    it('should accept authenticated users', () => {
      authenticationService.loggedIn$.next(true);
      expect(guard.canLoad({} as Route, {} as UrlSegment[])).toBeTruthy();
    });
  });
});
