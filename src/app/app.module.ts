import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {OrgChartComponent} from "./components/org-chart/org-chart.component";
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routing";
import {LineBuilderComponent} from "./components/line-builder/line-builder.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    OrgChartComponent,
    LineBuilderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
