import {Injectable, OnDestroy} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AuthenticationService} from '@reciptor/authentication/data-access';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad, OnDestroy {

  private loggedInSubscription: Subscription;
  private isAllowed = false;

  constructor(private authenticationService: AuthenticationService) {
    this.loggedInSubscription = this.authenticationService.loggedIn$.subscribe(
      isLoggedIn => this.isAllowed = isLoggedIn
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isAllowed;
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAllowed;
  }

}
