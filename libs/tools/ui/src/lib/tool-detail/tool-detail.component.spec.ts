import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolDetailComponent} from '@reciptor/tools/ui';
import {SharedMaterialModule} from '@reciptor/shared/material';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Tool, ToolsFacade} from '@reciptor/tools/data-access';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('ToolDetailComponent', () => {
  let component: ToolDetailComponent;
  let fixture: ComponentFixture<ToolDetailComponent>;

  const toolsFacadeMock = {
    loadTool: jest.fn(),
    selectedTool$: of({id: 123, name: 'knife'})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMaterialModule,
        HttpClientTestingModule
      ],
      declarations: [ToolDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        },
        {
          provide: ToolsFacade,
          useValue: toolsFacadeMock
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
      toolsFacadeMock.loadTool.mockReturnValue(of({id: 123, name: 'knife'} as Tool))

      expect(component.toolForm.get('name').value).toEqual('knife')
      expect(toolsFacadeMock.loadTool).toBeCalledWith(123)
    })
  });
});
