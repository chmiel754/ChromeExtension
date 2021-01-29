import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingPanelComponent } from './shopping-panel.component';
import { CardModule } from 'primeng/card';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ShoppingPanelComponent],
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    MessagesModule,
    ToastModule,
  ],
  exports: [
    ShoppingPanelComponent,
  ],
})
export class ShoppingPanelModule {
}
