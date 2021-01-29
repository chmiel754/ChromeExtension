import { NgModule } from '@angular/core';
import { SettingsPanelComponent } from './settings-panel.component';
import { MatSelectModule } from '@angular/material/select';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [SettingsPanelComponent],
  imports: [
    MatSelectModule,
    CardModule,
    PanelModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ListboxModule,
    ButtonModule,
    RippleModule,
    SliderModule,
    InputNumberModule,
    SelectButtonModule,
  ],
  providers: [],
  exports: [
    SettingsPanelComponent,
  ],
})
export class SettingsPanelModule {
}
