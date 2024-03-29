import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthInterceptorInterceptor', () => {
  let service: ExampleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor },
        ExampleService,
      ],
    });
    service = TestBed.inject(ExampleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('token is present', () => {
    beforeEach(() => {
      jest.spyOn(window.localStorage.__proto__, 'getItem');
      window.localStorage.__proto__.getItem = jest.fn(() => 'someIdToken');
    });
    it('should add Bearer-Token to every request', () => {
      service.exampleAction().subscribe((value) => {
        expect(value).not.toBeNull();
      });

      const httpRequest = httpMock.expectOne('http://example.com');

      expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
      expect(httpRequest.request.headers.get('Authorization')).toMatch(
        /^Bearer /
      );
    });
  });

  describe('no token is present', () => {
    beforeEach(() => {
      jest.spyOn(window.localStorage.__proto__, 'getItem');
      window.localStorage.__proto__.getItem = jest.fn(() => undefined);
    });
    it('should not add token', () => {
      service.exampleAction().subscribe((value) => {
        expect(value).not.toBeNull();
      });

      const httpRequest = httpMock.expectOne('http://example.com');
      expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
    });
  });
});

@Injectable()
class ExampleService {
  constructor(private httpClient: HttpClient) {}

  exampleAction() {
    return this.httpClient.get('http://example.com');
  }
}
