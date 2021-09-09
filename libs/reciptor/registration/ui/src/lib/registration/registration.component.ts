import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthenticationService, ReciptorRegistrationRequest} from "@reciptor/shared/data-access";
import {Router} from "@angular/router";

@Component({
  selector: 'reciptor-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  handleRegistrationEvent($event: ReciptorRegistrationRequest) {
    return this.authenticationService
        .register($event)
        .subscribe(() => this.router.navigate(['']))
  }
}
