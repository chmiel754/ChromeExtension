import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SettingsPanelModule } from './settings-panel/settings-panel.module';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ShoppingPanelModule } from './shopping-panel/shopping-panel.module';
import { TopItemsPanelModule } from './top-items-panel/top-items-panel.module';
import { RepeaterModule } from './repeater-panel/repeater.module';
import { ZalandCheckoutPanelComponent } from './zaland-checkout-panel/zaland-checkout-panel.component';
import { ZalandoItemComponent } from './zaland-checkout-panel/zalando-item/zalando-item.component';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    AppComponent,
    ZalandCheckoutPanelComponent,
    ZalandoItemComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SettingsPanelModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DialogModule,
    TabViewModule,
    ShoppingPanelModule,
    TopItemsPanelModule,
    RepeaterModule,
    FormsModule,
    RippleModule,
    InputTextModule,
    CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
