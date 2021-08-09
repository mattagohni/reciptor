import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'reciptor-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  handleRegistrationEvent($event: any) {
    return null
  }
}
