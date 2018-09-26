import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import {Component, OnInit} from "@angular/core";
declare var joint: any;

@Component({
  selector: 'app-line-builder',
  templateUrl: './line-builder.component.html',
  styleUrls: ['./line-builder.component.css']
})

export class LineBuilderComponent implements OnInit {
  graph: any = new joint.dia.Graph;
  paper: any;
  paperScroller: any;
  link: any;
  element: any;
  nodes: any;
  code;

  cod = "AQW#@0L100@90L50@90L50#";

  split;
  ngOnInit(){
    let splitCode = this.cod.split('@');
    splitCode.shift();
    splitCode[splitCode.length - 1] = splitCode[splitCode.length -1 ].replace('#','');
    this.split = splitCode;
    this.initDiagram();
    var x1 = 100;
    var y1 = 0;
    var x2 = x1 + 50 * Math.cos(90 * (180 / Math.PI));
    var y2 = y1 + 50 * Math.sin(90 * (180 / Math.PI));
    x2 = Math.cos((90+0)*Math.PI/180) * 50 + x1;
    y2 = Math.sin((90+0)*Math.PI/180) * 50 + y1;
    var x3 = x2 + Math.cos(3.14 * (180)/180) * 50;
    var y3 = y2 - Math.sin(3.14 * 90/180) * 50;

    x3 = Math.cos((90+90)*Math.PI/180) * 50 + x2;
    y3 = Math.sin((90+90)*Math.PI/180) * 50 + y2;
    console.log('-----------------');
    console.log('x2: ' +x2);
    console.log('y2: ' +y2);

    console.log('x3: '+x3);
    console.log('y3: '+y3);
    console.log('-----------------');

  }
  initDiagram() {
     this.graph = new joint.dia.Graph();
     this.paper = new joint.dia.Paper({
      model: this.graph,
      width: 600,
      height: 300,
      gridSize: 1,
      defaultLink: new joint.shapes.org.Arrow()
    });

    var paperScroller = new joint.ui.PaperScroller({
      paper: this.paper,
      autoResizePaper: true
    });
    var CustomLink = joint.dia.Link.define('examples.CustomLink', {
      defaultLabel: {
        attrs: { text: { text: '*' } }
      }
    });

    paperScroller.$el.css({ width: '100%', height: '100%' }).appendTo('#paper-container');
    paperScroller.zoom(-0.2);
    paperScroller.centerContent();
    let prevAngle = 0;
    let prevLength = 0;
    let preY = 0;

    for(let i = 0; i < this.split.length; i++){
      let angle = parseInt(this.split[i].substr(0, this.split[i].indexOf('L')));
      let length = parseInt(this.split[i].substring(this.split[i].indexOf('L') + 1));
      let link;
      if(i == 0){
        link = new CustomLink({
          source: { x: 0, y: 0},
          target: { x: length, y: angle}
        });
        prevLength = length;
      }
      else{
        var x2 = prevLength + Math.cos(3.14 * (prevAngle - angle)/180) * length;
        var y2 = prevAngle - Math.sin(3.14 * (angle)/180) * length;
        x2 = Math.cos((angle+prevAngle)*Math.PI/180) * length + prevLength;
        y2 = Math.sin((angle+prevAngle)*Math.PI/180) * length + preY;

        console.log('-----------------');
        console.log("X2: " +x2);
        console.log("Y2: " +y2);
        console.log("Angle: " +angle);
        console.log("Length: " +length);
        console.log("prevAngle: " +prevAngle);
        console.log("prevLength: " +prevLength);
        console.log('-----------------');

        link = new CustomLink({
          source: { x: prevLength, y: preY },
          target: { x: x2, y: y2}
        });
        prevLength = x2;
        prevAngle = angle;
        preY = y2;
      }
      // link.attr({
      //   '.connection': { stroke: '#222138' },
      //   '.marker-source': { fill: '#31d0c6', stroke: 'none', d: 'M 10 0 L 0 5 L 10 10 z' },
      //   '.marker-target': { fill: '#fe854f', stroke: '#7c68fc', d: 'M 10 0 L 0 5 L 10 10 z' }
      // });
      this.graph.addCell([link]);
    }

  }
  }
