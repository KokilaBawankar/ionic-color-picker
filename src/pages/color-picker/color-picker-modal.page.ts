import {
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {
    ColorChangeModel,
    ColorPickerCloseModel,
    ColorPickerOpenModel
} from '../../directives/color-picker/color-picker.directive';

const TEMPLATE = `
<ion-content scrollY="false">
    <div class="cp-color-grid">
        <div class="cp-color-bar-wrapper">
            <div class="cp-color-bar-color-none" (click)="setSelectedColor('none')">
                <div class="cp-color-bar-color-none-line"></div>
            </div>
        </div>

        <div class="cp-color-bar-wrapper" *ngFor="let color of colors">
            <div class="cp-color-bar"
                 [style.background-color]="color"
                 (click)="setSelectedColor(color)">
            </div>
        </div>
    </div>

    <ion-range #colorSlider
               class="cp-color-slider"
               [value]="colorSliderConfig.value"
               [min]="colorSliderConfig.min"
               [max]="colorSliderConfig.max"
               (ionChange)="onColorSliderChange(selectedColor, $event)">
    </ion-range>
</ion-content>
`;

const STYLES = [`
.cp-color-grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 190px;
  overflow-y: hidden;
  overflow-x: scroll;
  padding: 5px;
}

.cp-color-bar-wrapper {
  margin-right: 10px;
  padding: 5px;
}

.cp-color-bar-color-none,
.cp-color-bar {
  background-color: #f2f0f0;
  border-radius: 50%;
  box-shadow: 2px 3px 5px grey;
  height: 40px;
  width: 40px;
}

.cp-color-bar-color-none-line {
  border-bottom: 2px solid #FF9800;
  height: 41px;
  position: relative;
  -webkit-transform: translateY(-16px) translateX(16px) rotate(40deg);
  transform: translateY(-15px) translateX(12px) rotate(40deg);
  width: 41px;
}

.cp-color-bar-color-none {
  background-color: #e5e5e5;
}


.cp-color-slider {
  --bar-background-active: none;
  --bar-border-radius: 5px;
  --bar-height: 10px;
  margin-top: 10px;
}

ion-range:disabled {
  --bar-background-active: none;
}
  `];

@Component({
    selector: 'app-pick-color',
    template: TEMPLATE,
    styles: STYLES
})
export class ColorPickerModalPage implements OnInit, OnDestroy {

    @Output() colorPickerOpen: EventEmitter<ColorPickerOpenModel> = new EventEmitter();
    @Output() colorPickerClose: EventEmitter<ColorPickerCloseModel> = new EventEmitter();
    @Output() colorChange: EventEmitter<ColorChangeModel> = new EventEmitter();

    @ViewChild('colorSlider', {static: true}) colorSlider: ElementRef;

    colors: string[] = [];
    selectedColor: string;
    colorSliderConfig = {
        min: -100,
        max: 100,
        value: 0,
        defaultBarBackground: '#e5e5e5'
    };

    constructor(private modalController: ModalController,
                private renderer2: Renderer2) {
    }

    ngOnInit() {
        // @ts-ignore
        this.renderer2.setAttribute(this.colorSlider.el, 'disabled', 'true');
        this.colorPickerOpen.emit({isColorPickerOpen: true});
    }

    ngOnDestroy(): void {
        this.colorPickerClose.emit({isColorPickerClose: true});
    }

    setSelectedColor(color: string) {
        this.selectedColor = color;
        this.setColorSliderBackgroundGradient(color);
        // @ts-ignore
        this.renderer2.setAttribute(this.colorSlider.el, 'value', this.colorSliderConfig.value.toString());
        this.colorChange.emit({color});
        if (this.selectedColor === 'none') {
            // @ts-ignore
            this.renderer2.setAttribute(this.colorSlider.el, 'disabled', 'true');
        } else {
            // @ts-ignore
            this.renderer2.setAttribute(this.colorSlider.el, 'disabled', 'false');
        }
    }

    adjustColor(color: string, customEvent?: CustomEvent, amount?: number) {
        const amt = customEvent ? customEvent.detail.value : amount;
        let usePound = false;

        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }

        let R = parseInt(color.substring(0, 2), 16);
        let G = parseInt(color.substring(2, 4), 16);
        let B = parseInt(color.substring(4, 6), 16);

        // to make the colour less bright than the input
        // change the following three "+" symbols to "-"
        R = R + amt;
        G = G + amt;
        B = B + amt;

        if (R > 255) {
            R = 255;
        } else if (R < 0) {
            R = 0;
        }

        if (G > 255) {
            G = 255;
        } else if (G < 0) {
            G = 0;
        }

        if (B > 255) {
            B = 255;
        } else if (B < 0) {
            B = 0;
        }

        const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
        const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
        const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));

        return (usePound ? '#' : '') + RR + GG + BB;
    }

    setColorSliderBackgroundGradient(color: string) {
        if (color !== 'none') {
            const darkColor = this.adjustColor(color, undefined, this.colorSliderConfig.min) + ' 0%,';
            const middleolor = color + ' 50%,';
            const lightColor = this.adjustColor(color, undefined, this.colorSliderConfig.max) + ' 100%)';
            // 'linear-gradient(100deg, rgba(92,0,0,1) 0%, rgba(192,57,43,1) 50%, rgba(255,157,143,1) 100%)'
            const linearGradient = 'linear-gradient(100deg, ' + darkColor + middleolor + lightColor;
            // @ts-ignore
            this.renderer2.setStyle(this.colorSlider.el.shadowRoot.children[1].children[0], 'background', linearGradient);
        } else {
            // @ts-ignore
            this.renderer2.setStyle(this.colorSlider.el.shadowRoot.children[1].children[0],
                'background', this.colorSliderConfig.defaultBarBackground);
        }
    }

    onColorSliderChange(selectedColor: string, $event: CustomEvent<any>) {
        this.colorChange.emit({color: this.adjustColor(selectedColor, $event)});
    }
}
