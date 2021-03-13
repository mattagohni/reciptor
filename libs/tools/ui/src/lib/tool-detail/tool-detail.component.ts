import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Tool} from '@reciptor/tools/data-access';

@Component({
  selector: 'reciptor-tool',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolDetailComponent {
  @Input()
  tool: Tool
}
