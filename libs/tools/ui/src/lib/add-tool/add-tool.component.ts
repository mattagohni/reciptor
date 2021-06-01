import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Tool, ToolsFacade} from '@reciptor/tools/data-access';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'reciptor-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToolComponent implements OnInit {
  tool$: Observable<Tool> = of({} as Tool);
  toolForm: FormGroup;

  constructor(private toolsFacade: ToolsFacade, private formBuilder: FormBuilder) {
  }

  save() {
    this.toolsFacade.saveTool({...this.toolForm.value})
  }

  ngOnInit(): void {
    this.toolForm = this.formBuilder.group(
      {
        name: ['', Validators.required]
      }
    );
  }
}
