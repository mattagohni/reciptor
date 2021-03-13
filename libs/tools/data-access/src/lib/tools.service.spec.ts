import {TestBed} from '@angular/core/testing';

import {ToolsService} from './tools.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ToolsService', () => {
  let service: ToolsService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ToolsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getTools', () => {
    it('should return a list of all existing tools', () => {
      const expectedTools = [
        {id: 1, name: 'knife'},
        {id: 2, name: 'spoon'}
      ]

      service.getAll().subscribe( tools => {
          tools.every(tool => {
            expect(expectedTools).toContain(tool)
          })
        }
      )

      const request = httpMock.expectOne(`${service.API_URL}/tools`)
      expect(request.request.method).toBe('GET')
      request.flush(expectedTools)
    });
  });

  describe('#getTool', () => {
    it('it should get a tool for a given id', () => {
      const expectedTool = {name: 'spoon'};

      service.getTool(1).subscribe(tool => {
        expect(tool).toEqual(tool);
      });

      const request = httpMock.expectOne(`${service.API_URL}/tools/1`);
      expect(request.request.method).toBe('GET');
      request.flush(expectedTool)
    })
  });

  afterEach(() => {
    httpMock.verify();
  });
});
