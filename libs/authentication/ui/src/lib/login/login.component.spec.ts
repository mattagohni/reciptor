import {LoginComponent} from './login.component';
import {ReciptorAuthenticationRequest} from '@reciptor/authentication/data-access';
import {of} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  const authenticationService = {login: jest.fn(() => of({token: 'someToken', expires: Date.now() + 1000}))}
  const router = {navigate: jest.fn()}

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component = new LoginComponent(authenticationService as any, router as any)
  });

  it('navigates to root page after successful login', () => {
    const authRequest: ReciptorAuthenticationRequest = {username: 'mattagohni', password: 'myPassword'}

    component.handleAuthenticationEvent(authRequest);

    expect(authenticationService.login).toHaveBeenCalledWith(authRequest);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
