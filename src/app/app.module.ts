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
@NgModule({
  declarations: [
    AppComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
