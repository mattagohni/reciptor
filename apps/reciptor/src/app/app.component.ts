import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'reciptor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reciptor';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('de');
    translate.use('de');
  }

  isLoggedIn() {
    const idToken = localStorage.getItem('id_token');
    const expires = localStorage.getItem('expires');

    const expireAt = moment.unix(parseInt(expires)).unix();
    return idToken && expireAt > moment.now()
  }
}
