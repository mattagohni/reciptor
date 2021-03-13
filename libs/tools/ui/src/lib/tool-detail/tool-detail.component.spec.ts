import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolDetailComponent} from '@reciptor/tools/ui';
import {SharedMaterialModule} from '@reciptor/shared/material';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToolsService} from '@reciptor/tools/data-access';


describe('ToolDetailComponent', () => {
  let component: ToolDetailComponent;
  let fixture: ComponentFixture<ToolDetailComponent>;
  const toolsServiceMock = {
    getTool: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedMaterialModule, HttpClientTestingModule],
      declarations: [ToolDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        },
        {
          provide: ToolsService,
          useValue: toolsServiceMock
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be correct initialized', () => {
      expect(toolsServiceMock.getTool).toBeCalledWith(123)
    })
  });
});
