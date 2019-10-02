import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ColorPickerModalPage} from '../../pages/color-picker/color-picker-modal.page';

export interface ColorPickerOpenModel {
    isColorPickerOpen: boolean;
}

export interface ColorPickerCloseModel {
    isColorPickerClose: boolean;
}

export interface ColorChangeModel {
    color: string;
}

@Directive({
    selector: '[ionicColorPicker]'
})
export class ColorPickerDirective {

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onColorPickerOpen: EventEmitter<ColorPickerOpenModel> = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onColorPickerClose: EventEmitter<ColorPickerCloseModel> = new EventEmitter();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onColorChange: EventEmitter<ColorChangeModel> = new EventEmitter();

    @Input() colors: string[] = [
        '#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', '#3498DB', '#1ABC9C', '#16A085', '#27AE60', '#2ECC71',
        '#F1C40F', '#F39C12', '#E67E22', '#D35400', '#ECF0F1', '#BDC3C7', '#95A5A6', '#7F8C8D', '#34495E', '#2C3E50'];
    @Input() position = 'bottom';

    constructor(private elementRef: ElementRef,
                private modalController: ModalController) {
    }

    @HostListener('click', ['$event'])
    async openColorPicker(event) {
        const modal = await this.modalController.create({
            component: ColorPickerModalPage,
            backdropDismiss: false,
            showBackdrop: true,
            componentProps: {
                onColorPickerOpen: this.onColorPickerOpen,
                onColorPickerClose: this.onColorPickerClose,
                onColorChange: this.onColorChange,
                colors: this.colors
            },
            cssClass: ['color-picker-modal', 'color-picker-modal-' + this.position.trim()]
        });
        await modal.present();
    }
}
