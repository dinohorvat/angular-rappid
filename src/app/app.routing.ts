import {Routes} from "@angular/router";
import {OrgChartComponent} from "./components/org-chart/org-chart.component";
import {LineBuilderComponent} from "./components/line-builder/line-builder.component";

export const rootRouterConfig: Routes = [
  {
    path: 'org-chart',
    component: OrgChartComponent,
    pathMatch: 'full'
  },
  {
    path: 'line-builder',
    component: LineBuilderComponent,
    pathMatch: 'full'
  }
  ];
