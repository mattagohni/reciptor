import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'reciptor-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
