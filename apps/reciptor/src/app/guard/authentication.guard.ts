import {Injectable, OnDestroy} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AuthenticationService} from '@reciptor/shared/data-access';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanLoad, OnDestroy {
    private loggedInSubscription: Subscription;
    private isAllowed = false;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.loggedInSubscription = this.authenticationService.loggedIn$.subscribe(
            (isLoggedIn) => (this.isAllowed = isLoggedIn)
        );
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.isAllowed === true ? true : this.router.parseUrl('/login');
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.isAllowed === true ? true : this.router.parseUrl('/login');
    }

    ngOnDestroy(): void {
        this.loggedInSubscription.unsubscribe();
    }
}
