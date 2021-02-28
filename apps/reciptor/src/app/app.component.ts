import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
}
