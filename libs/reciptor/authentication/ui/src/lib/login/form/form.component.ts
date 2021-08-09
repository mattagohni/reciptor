import {ChangeDetectionStrategy, Component, EventEmitter, Output,} from '@angular/core';
import {ReciptorAuthenticationRequest} from '@reciptor/authentication/data-access';

@Component({
  selector: 'reciptor-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Output()
  authRequestEvent: EventEmitter<ReciptorAuthenticationRequest> = new EventEmitter<ReciptorAuthenticationRequest>();

  formData = {
    username: '',
    password: '',
  };

  submit() {
    this.authRequestEvent.emit({
      username: this.formData.username,
      password: this.formData.password,
    });
  }
}
