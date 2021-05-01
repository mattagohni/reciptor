import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Tool, ToolsFacade} from '@reciptor/tools/data-access';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'reciptor-tool',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolDetailComponent implements OnInit {
  tool$: Observable<Tool> = this.toolsFacade.selectedTool$.pipe(
    tap(tool => this.toolForm.patchValue(tool))
  );
  toolForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private toolsFacade: ToolsFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.toolForm = this.formBuilder.group(
      {
        name: ['', Validators.required]
      }
    );

    this.route.params.subscribe(params => {
      this.toolsFacade.loadTool(params['id']);
    });
  }

  delete(tool: Tool) {
    this.toolsFacade.deleteTool(tool.id);
  }

  updateTool(tool: Tool) {
    this.toolsFacade.updateTool({...tool, name: this.toolForm.value.name})
  }
}
