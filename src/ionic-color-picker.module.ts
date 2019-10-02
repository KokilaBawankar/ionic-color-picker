import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorPickerDirective} from './directives/color-picker/color-picker.directive';
import {ColorPickerModalModule} from './pages/color-picker/color-picker-modal.module';
import {ColorPickerModalPage} from './pages/color-picker/color-picker-modal.page';


@NgModule({
    declarations: [
        ColorPickerDirective
    ],
    entryComponents: [
        ColorPickerModalPage
    ],
    imports: [
        CommonModule,
        ColorPickerModalModule
    ],
    exports: [
        ColorPickerDirective
    ]
})
export class IonicColorPickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IonicColorPickerModule
        };
    }
}
