import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {ReciptorRegistrationRequest} from "@reciptor/authentication/data-access";

@Component({
  selector: 'reciptor-registration-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

  @Output()
  registerRequestEvent: EventEmitter<ReciptorRegistrationRequest> = new EventEmitter<ReciptorRegistrationRequest>();

  formData = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  submit() {
    this.registerRequestEvent.emit({
      username: this.formData.username,
      password: this.formData.password,
    });
  }
}
