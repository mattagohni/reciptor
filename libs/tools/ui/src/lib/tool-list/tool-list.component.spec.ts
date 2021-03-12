import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolListComponent} from './tool-list.component';
import {ToolsFacade} from '@reciptor/tools/data-access';
import {of} from 'rxjs';

describe('ToolListComponent', () => {
  let component: ToolListComponent;
  let fixture: ComponentFixture<ToolListComponent>;
  const toolsFacadeMock = {
    init: jest.fn(),
    allTools$: of([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ToolsFacade, useValue: toolsFacadeMock}
      ],
      declarations: [ToolListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialize component', () => {
    it('should be initialized with data from store facade', () => {
      expect(toolsFacadeMock.init).toHaveBeenCalledTimes(1);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
