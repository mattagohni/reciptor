import { RegistrationComponent } from './registration.component';
import { ReciptorRegistrationRequest } from '@reciptor/shared/data-access';
import { of } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  const authenticationService = {
    register: jest.fn(() =>
      of({ token: 'someToken', expires: Date.now() + 1000 })
    ),
  };
  const router = { navigate: jest.fn() };

  beforeEach(async () => {
    component = new RegistrationComponent(
      authenticationService as any,
      router as any
    );
  });

  it('navigates to root page after successful login', () => {
    const registrationRequest: ReciptorRegistrationRequest = {
      username: 'mattagohni',
      password: 'myPassword',
    };

    component.handleRegistrationEvent(registrationRequest);

    expect(authenticationService.register).toHaveBeenCalledWith(
      registrationRequest
    );
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
