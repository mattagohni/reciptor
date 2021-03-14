import {Component, OnInit} from '@angular/core';
import {Tool, ToolsFacade} from '@reciptor/tools/data-access';
import {Observable} from 'rxjs';

@Component({
  selector: 'reciptor-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit {
  tools$: Observable<Tool[]> = this.toolsFacade.allTools$
  displayedColumns: string[] = ['id', 'name', 'link'];
  constructor(private toolsFacade: ToolsFacade) {}

  ngOnInit(): void {
    this.toolsFacade.init()
  }
}

