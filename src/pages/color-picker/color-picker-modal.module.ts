import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ColorPickerModalPage } from './color-picker-modal.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  entryComponents: [ColorPickerModalPage],
  declarations: [ColorPickerModalPage]
})
export class ColorPickerModalModule {}
