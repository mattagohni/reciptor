import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthenticationService} from '@reciptor/authentication/data-access';
import {FormComponent} from './form/form.component';
import {SharedMaterialModule} from '@reciptor/shared/material';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authenticationService = {login: jest.fn}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedMaterialModule, FormsModule, TranslateModule.forRoot(), NoopAnimationsModule],
      declarations: [LoginComponent, FormComponent],
      providers: [
        {provide: AuthenticationService, useValue: authenticationService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
