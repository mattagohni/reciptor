import {Component, OnInit} from '@angular/core';
import {Tool, ToolsFacade} from '@reciptor/tools/data-access';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'reciptor-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit {
  tools$: Observable<Tool[]> = this.toolsFacade.allTools$
  toolsCount$: Observable<number> = this.tools$.pipe(
    map(toolCollection => toolCollection.length)
  );
  displayedColumns: string[] = ['id', 'name', 'link'];

  constructor(private toolsFacade: ToolsFacade) {
  }

  ngOnInit(): void {
    this.toolsFacade.init()
  }
}

