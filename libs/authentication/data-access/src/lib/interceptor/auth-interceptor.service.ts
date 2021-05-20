import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const idToken = localStorage.getItem("id_token");

    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + idToken)
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
