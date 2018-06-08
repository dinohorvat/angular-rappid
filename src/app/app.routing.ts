import {Routes} from "@angular/router";
import {OrgChartComponent} from "./components/org-chart/org-chart.component";

export const rootRouterConfig: Routes = [
  {
    path: 'org-chart',
    component: OrgChartComponent,
    pathMatch: 'full'
  }
  ];
