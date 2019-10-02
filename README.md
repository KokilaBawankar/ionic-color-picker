# Ionic Color Picker
A cool color picker in Ionic 4 and Angular 8. It can also let you darken or brighten the selected color using the color slider.

# Install
```
npm install ionic-color-picker --save
```
# Usage
- Import IonicColorPickerModule in your app.module.ts.
```
import {IonicColorPickerModule} from 'ionic-color-picker';
```

```
@NgModule({
  imports: [
      ...,
      IonicColorPickerModule,
      ...
  ]
})
```

**Example**
```
<ion-button
            ionicColorPicker
            [colors]="['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', '#3498DB', '#1ABC9C', '#16A085', '#27AE60', '#2ECC71']"
            [position]="'bottom'"
            (onColorPickerOpen)="onClick($event)"
            (onColorPickerClose)="onClick($event)"
            (onColorChange)="onClick($event)">
        Change Color
    </ion-button>
```
- **ionicColorPicker** is the name of directive. Add this directive to any element on click of which you wanted to open the color picker.

# Input Options

Properties | Description | Possible Values | Deafault Value
---|---|---|---
colors | String array of colors in hexadecimal format. | [`#C0392B`, `#E74C3C`] | These are the default colors ![#C0392B](https://placehold.it/15/C0392B/000000?text=+) ![#E74C3C](https://placehold.it/15/E74C3C/000000?text=+) ![#9B59B6](https://placehold.it/15/9B59B6/000000?text=+) ![#8E44AD](https://placehold.it/15/8E44AD/000000?text=+) ![#2980B9](https://placehold.it/15/2980B9/000000?text=+) ![#3498DB](https://placehold.it/15/3498DB/000000?text=+) ![#1ABC9C](https://placehold.it/15/1ABC9C/000000?text=+) ![#16A085](https://placehold.it/15/16A085/000000?text=+) ![#27AE60](https://placehold.it/15/27AE60/000000?text=+) ![#2ECC71](https://placehold.it/15/2ECC71/000000?text=+) ![#F1C40F](https://placehold.it/15/F1C40F/000000?text=+) ![#F39C12](https://placehold.it/15/F39C12/000000?text=+) ![#E67E22](https://placehold.it/15/E67E22/000000?text=+) ![#D35400](https://placehold.it/15/D35400/000000?text=+) ![#ECF0F1](https://placehold.it/15/ECF0F1/000000?text=+) ![#BDC3C7](https://placehold.it/15/BDC3C7/000000?text=+) ![#95A5A6](https://placehold.it/15/95A5A6/000000?text=+) ![#7F8C8D](https://placehold.it/15/7F8C8D/000000?text=+) ![#34495E](https://placehold.it/15/34495E/000000?text=+) ![#2C3E50](https://placehold.it/15/2C3E50/000000?text=+)
position| Position of the color picker.| 'bottom', 'top', 'center' | 'bottom'

# Output Events
- **onColorPickerOpen** - Occurs when color picker opens.
- **onColorPickerClose** - Occurs when color picker closes.
- **onColorChange** - Occurs every time color is selected from picker and also when moves the slider to darken or lighten the color.

