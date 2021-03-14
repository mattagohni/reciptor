import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ToolListComponent} from '@reciptor/tools/ui';
import {ToolsFacade} from '@reciptor/tools/data-access';
import {of} from 'rxjs';
import {SharedMaterialModule} from '@reciptor/shared/material';
import {RouterTestingModule} from '@angular/router/testing';

describe('ToolListComponent', () => {
  let component: ToolListComponent;
  let fixture: ComponentFixture<ToolListComponent>;
  const toolsFacadeMock = {
    init: jest.fn(),
    allTools$: of([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedMaterialModule, RouterTestingModule],
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
