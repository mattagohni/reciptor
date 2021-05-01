import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddToolComponent} from '@reciptor/tools/ui';
import {SharedMaterialModule} from '@reciptor/shared/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {Tool, ToolsFacade} from '@reciptor/tools/data-access';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AddToolComponent', () => {
  let component: AddToolComponent;
  let fixture: ComponentFixture<AddToolComponent>;

  const toolsFacadeMock = {
    saveTool: jest.fn(),
    selectedTool$: of({id: 123, name: 'knife'})
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedMaterialModule, ReactiveFormsModule, FormsModule],
      declarations: [ AddToolComponent ],
      providers: [
        {
          provide: ToolsFacade,
          useValue: toolsFacadeMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('saving a new tool', () => {
    it('should call toolsFacade with tool', () => {
      const tool = {id: undefined, name: undefined} as Tool;
      component.toolForm.value.name = 'superTool'

      component.save()

      expect(toolsFacadeMock.saveTool).toHaveBeenNthCalledWith(1, {...tool, name: 'superTool'})
    });
  })
});
