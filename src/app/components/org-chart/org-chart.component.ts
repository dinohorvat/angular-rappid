import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
declare var joint: any

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit {
  graph: any = new joint.dia.Graph;
  paper: any;
  paperScroller: any;
  lastLink: any;
  link: any;
  element: any;
  nodes: any;
  selectedCell: any;
  ngOnInit() {
    this.initDiagram();
  }

  initDiagram() {
    joint.setTheme('material');

    this.paper = new joint.dia.Paper({
      height: 500,
      width: 2000,
      gridSize: 10,
      model: this.graph,
      perpendicularLinks: true,
      interactive: true
    });

    this.paperScroller = new joint.ui.PaperScroller({
      paper: this.paper,
      cursor: 'grab',
      baseWidth: 1,
      baseHeight: 1,
      contentOptions: {
        padding: 100,
        allowNewOrigin: 'any'
      }
    });
    this.paperScroller.render().$el.appendTo('#tree-app');
  }

}
