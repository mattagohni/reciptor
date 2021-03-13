import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {SharedUiHeaderModule} from '@reciptor/shared/ui-header';
import {TranslateModule} from '@ngx-translate/core';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        SharedUiHeaderModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'reciptor'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('reciptor');
  });
});
