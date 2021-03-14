import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Tool, ToolsFacade} from '@reciptor/tools/data-access';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'reciptor-tool',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolDetailComponent implements OnInit{
  tool$: Observable<Tool> = this.toolsFacade.selectedTool$

  @Input()
  private toolId: number;

  constructor(private route: ActivatedRoute, private toolsFacade: ToolsFacade) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.toolsFacade.loadTool(params['id'])
    })
  }
}
