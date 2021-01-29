import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopItemsPanelComponent } from './top-items-panel.component';
import { SharedModule } from 'primeng/api';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [TopItemsPanelComponent],
  exports: [
    TopItemsPanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderListModule,
    ButtonModule,
    RippleModule,
    MessagesModule,
    ToastModule,
  ],
})
export class TopItemsPanelModule {
}
