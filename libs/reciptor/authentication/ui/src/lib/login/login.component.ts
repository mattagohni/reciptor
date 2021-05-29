import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationService } from '@reciptor/authentication/data-access';
import { ReciptorAuthenticationRequest } from '@reciptor/authentication/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'reciptor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  handleAuthenticationEvent($event: ReciptorAuthenticationRequest) {
    this.authenticationService
      .login($event)
      .subscribe(() => this.router.navigate(['']));
  }
}
