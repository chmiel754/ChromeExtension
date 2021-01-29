import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyzeRoutingModule } from './analyze-routing.module';
import { AnalyzeComponent } from './analyze.component';


@NgModule({
  declarations: [AnalyzeComponent],
  exports: [
    AnalyzeComponent,
  ],
  imports: [
    CommonModule,
    AnalyzeRoutingModule,
  ],
})
export class AnalyzeModule { }
