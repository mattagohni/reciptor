import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedMaterialModule } from '@reciptor/shared/material';
import { SharedUiHeaderModule } from '@reciptor/shared/ui-header';
import { TranslateModule } from '@ngx-translate/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        SharedMaterialModule,
        SharedUiHeaderModule,
        TranslateModule.forRoot(),
      ],
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

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-card-header').textContent).toContain(
      'app.translate.demo'
    );
  });
});
