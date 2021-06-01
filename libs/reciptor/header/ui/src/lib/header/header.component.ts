import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation,} from '@angular/core';
import {AuthenticationService} from '@reciptor/authentication/data-access';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'reciptor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authenticationService.loggedIn$.subscribe(
      (isLoggedInValue) => {
        return this.isLoggedIn$.next(isLoggedInValue);
      }
    );
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  logout() {
    this.authenticationService.logout();
  }
}
