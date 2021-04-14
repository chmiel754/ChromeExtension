import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepeaterComponent } from './repeater.component';
import { CardModule } from 'primeng/card';
import { RepeaterItemComponent } from './repeater-item/repeater-item.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';



@NgModule({
  declarations: [RepeaterComponent, RepeaterItemComponent],
  exports: [
    RepeaterComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RippleModule,
  ],
})
export class RepeaterModule { }
