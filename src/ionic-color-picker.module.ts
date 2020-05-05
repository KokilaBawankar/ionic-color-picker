import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ColorPickerDirective} from './directives/color-picker/color-picker.directive';
import {ColorPickerModalModule} from './pages/color-picker/color-picker-modal.module';

@NgModule({
    declarations: [ColorPickerDirective],
    imports: [
        CommonModule,
        ColorPickerModalModule
    ],
    exports: [ColorPickerDirective]
})
export class IonicColorPickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IonicColorPickerModule
        };
    }
}
