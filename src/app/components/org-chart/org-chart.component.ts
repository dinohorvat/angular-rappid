import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
declare var joint: any;

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
    joint.setTheme('modern');

    // Extend the Orgchart member markup with control buttons.
    joint.shapes.org.Member.prototype.markup = [
      '<g class="rotatable">',
      '<g class="scalable">',
      '<rect class="card"/><image/>',
      '</g>',
      '<text class="rank"/><text class="name"/>',
      '<g class="btn add"><circle class="add"/><text class="add">+</text></g>',
      '<g class="btn del"><circle class="del"/><text class="del">-</text></g>',
      '<g class="btn edit"><rect class="edit"/><text class="edit">EDIT</text></g>',
      '</g>'
    ].join('');

    // A helper to create a member model
    var member = function(rank, name, image, background, textColor?) {

      textColor = textColor || "#000";

      var element = new joint.shapes.org.Member({
        size: { width: 260, height: 90 },
        attrs: {
          '.card': { fill: background, 'stroke-width': 0 },
          image: { 'xlink:href': image, 'ref-y': 10, opacity: 0.7 },
          '.rank': { fill: textColor, text: '', 'font-size': 16, 'text-decoration': 'none', 'ref-x': 0.95, 'ref-y': 0.5, 'y-alignment': 'middle', 'word-spacing': '-1px', 'letter-spacing': 0 },
          '.name': { fill: textColor, text: '', 'ref-x': 0.95, 'ref-y': 0.7, 'font-family': 'Arial' },
          '.btn.add': { 'ref-dx': -15,'ref-y': 15, 'ref': '.card', event: 'element:add' },
          '.btn.del': { 'ref-dx': -45,'ref-y': 15, 'ref': '.card', event: 'element:delete' },
          '.btn.edit': { 'ref-dx': -140,'ref-y': 5, 'ref': '.card', event: 'element:edit' },
          '.btn>circle': { r: 10, fill: 'transparent', stroke: '#333', 'stroke-width': 1 },
          '.btn>rect': { height: 20, width: 45, rx: 2, ry: 2, fill: 'transparent', 'stroke-width': 1 },
          '.btn.add>text': { fill: textColor,'font-size': 23, 'font-weight': 800, stroke: "#000", x: -6.5, y: 8, 'font-family': 'Times New Roman' },
          '.btn.del>text': { fill: textColor,'font-size': 28, 'font-weight': 500, stroke: "#000", x: -4.5, y: 6, 'font-family': 'Times New Roman' },
          '.btn.edit>text': { fill: textColor,'font-size': 15, 'font-weight': 500, stroke: "#000", x: 5, y: 15, 'font-family': 'Sans Serif' }
        }
      }).on({
        'change:name': function(cell, name) {
          cell.attr('.name/text', joint.util.breakText(name, { width: 160, height: 45 }, cell.attr('.name')));
        },
        'change:rank': function(cell, rank) {
          cell.attr('.rank/text', joint.util.breakText(rank, { width: 165, height: 45 }, cell.attr('.rank')));
        }
      }).set({
        name: name,
        rank: rank
      });

      return element;
    };

    // A helper to create an arrow connection
    function link(source, target) {
      return new joint.shapes.org.Arrow({
        source: { id: source.id },
        target: { id: target.id }
      });
    }

    var members = [
      member('Corporation', 'Nora Ventures', 'assets/images/bank.png', '#961A58'),
      member('Sub Corp', 'Sub Ventures', 'assets/images/bank.png', '#961A58'),
      member('Shareholder 20%', 'Scott Thompson', 'assets/images/male.png', '#961b85'),
      member('Shareholder 20%' , 'Devin Wenig', 'assets/images/male.png', '#961b85'),
      member('Shareholder 50%', 'Jeffrey S. Skoll', 'assets/images/male.png', '#961b85'),
      member('Shareholder 10%', 'Steven P. Westly', 'assets/images/male.png', '#961b85')
    ];

    var connections = [
      link(members[0], members[1]),
      link(members[1], members[2]),
      link(members[1], members[3]),
      link(members[1], members[4]),
      link(members[1], members[5])
    ];

    var graph = new joint.dia.Graph();
    var paper = new joint.dia.Paper({
      model: graph,
      width: 1,
      height: 1,
      gridSize: 1,
      defaultLink: new joint.shapes.org.Arrow()
    });

    var paperScroller = new joint.ui.PaperScroller({
      paper: paper,
      autoResizePaper: true
    });

    var treeLayout = new joint.layout.TreeLayout({
      graph: graph,
      direction: 'B'
    });

    paperScroller.$el.css({ width: '100%', height: '100%' }).appendTo('#paper-container');
    graph.resetCells(members.concat(connections));
    treeLayout.layout();
    paperScroller.zoom(-0.2);
    paperScroller.centerContent();

    paper.on('blank:pointerdown', paperScroller.startPanning);

    paper.on('element:add', function(elementView, evt) {
      evt.stopPropagation();
      // Adding a new member
      var newMember = member('Employee', 'New Employee', 'assets/assets/images/bank.png', '#c6c7e2');
      var newConnection = link(elementView.model, newMember);
      graph.addCells([newMember, newConnection]);
      treeLayout.layout();
    });

    paper.on('element:delete', function(elementView, evt, x, y) {
      evt.stopPropagation();
      // A member removal
      elementView.model.remove();
      treeLayout.layout();
    });

    paper.on('element:edit', function(elementView, evt, x, y) {
      evt.stopPropagation();
      // A member edit
      var inspector = new joint.ui.Inspector({
        cellView: elementView,
        live: false,
        inputs: {
          'rank': {
            type: 'text',
            label: 'Rank',
            index: 1
          },
          'name': {
            type: 'text',
            label: 'Name',
            index: 2
          },
          'attrs/image/xlink:href': {
            type: 'select-box',
            target: '.joint-dialog .fg',
            width: 210,
            label: 'Sex',
            options: [
              { value: 'assets/images/bank.png', content: 'Male' },
              { value: 'assets/assets/images/bank.png', content: 'Female' }
            ],
            index: 3
          },
          'attrs/.card/fill': {
            type: 'color-palette',
            target: '.joint-dialog .fg',
            label: 'Color',
            index: 4,
            options: [
              { content: '#31d0c6' },
              { content: '#7c68fc' },
              { content: '#fe854f' },
              { content: '#feb663' },
              { content: '#c6c7e2' }
            ]
          }
        }
      });

      var dialog = new joint.ui.Dialog({
        type: 'inspector-dialog',
        width: 250,
        title: 'Edit Member',
        closeButton: false,
        content: inspector.render().el,
        buttons: [{
          content: 'Cancel',
          action: 'cancel'
        }, {
          content: 'Apply',
          action: 'apply'
        }]
      });

      dialog.on({
        'action:cancel': function() {
          inspector.remove();
          dialog.close();
        },
        'action:apply': function() {
          inspector.updateCell();
          inspector.remove();
          dialog.close();
        }
      });
      dialog.open();
    });

    // Tree Layout Rank Selection
    var directionPicker = new joint.ui.SelectBox({
      width: 150,
      options: [
        { value: 'L', content: 'Right-Left' },
        { value: 'R', content: 'Left-Right', selected: true },
        { value: 'T', content: 'Bottom-Top' },
        { value: 'B', content: 'Top-Bottom' }
      ]
    });

    directionPicker.on('option:select', function(option) {
      _.invoke(graph.getElements(), 'set', 'direction', option.value);
      treeLayout.layout();
      paperScroller.centerContent();
    });

    directionPicker.render().$el.appendTo('#orgchart-direction');

    new joint.ui.TreeLayoutView({
      paper: paper,
      model: treeLayout,
      previewAttrs: {
        parent: { rx: 10, ry: 10 }
      }
    });
  }

}
