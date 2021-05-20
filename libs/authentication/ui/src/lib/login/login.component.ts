import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'reciptor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  API_URL =  'http://localhost:8080/api/v1/login'

  formData = {
    username: '',
    password: '',
  }
  constructor(private httpClient: HttpClient) { }



  submit() {
    this.httpClient.post(this.API_URL, {username: this.formData.username, password: this.formData.password }).subscribe(
      value => console.log(value)
    )
  }
}
