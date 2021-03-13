import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Tool} from '@reciptor/tools/data-access';
import {ActivatedRoute} from '@angular/router';
import {ToolsService} from '@reciptor/tools/data-access';
import {Observable} from 'rxjs';

@Component({
  selector: 'reciptor-tool',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolDetailComponent implements OnInit{
  @Input()
  tool$: Observable<Tool>
  private toolId: number;

  constructor(private route: ActivatedRoute, private toolsService: ToolsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.toolId = params['id'];
      // @todo the tool should be fetched from store via the facade
      this.tool$ = this.toolsService.getTool(this.toolId)
    })
  }
}
