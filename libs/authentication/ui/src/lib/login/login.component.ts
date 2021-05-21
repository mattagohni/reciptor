import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthenticationService} from '@reciptor/authentication/data-access';
import {ReciptorAuthenticationRequest} from '@reciptor/authentication/data-access';

@Component({
  selector: 'reciptor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService) {
  }

  handleAuthenticationEvent($event: ReciptorAuthenticationRequest) {
    this.authenticationService.login($event).subscribe(value => console.log(value))
  }
}
