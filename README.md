# Ionic Color Picker
A cool color picker in Ionic 4 and Angular 8. It can also let you darken or brighten the selected color using the color slider and you can also pass the colors among which you want yours to choose.

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
- Import styles.scss in global.scss file (add below line to global.scss).
```
@import "~ionic-color-picker/dist/assets/css/styles";
```

**Example**
```
<ion-button
            ionicColorPicker
            [colors]="['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', '#3498DB', '#1ABC9C', '#16A085', '#27AE60', '#2ECC71']"
            (colorPickerOpen)="eventOccur($event)"
            (colorPickerClose)="eventOccur($event)"
            (colorChange)="eventOccur($event)">
        Change Color
    </ion-button>
```
- **ionicColorPicker** is the name of directive. Add this directive to any element on click of which you wanted to open the color picker.

# Input Options

Properties | Description | Possible Values
---|---|---|---
colors (Optional)| String array of colors in hexadecimal format. | string[] e.g. [`'#C0392B'` `'#E74C3C'`]

# Output Events

Event | Description | Event
---|---|---
colorPickerOpen | Occurs when color picker opens. | ```{isColorPickerOpen:boolean;}```
colorPickerClose | Occurs when color picker closes. | ```{isColorPickerClose: boolean;}```
colorChange | Occurs every time color is selected from picker and also when moves the slider to darken or lighten the color. | ```{color: string;}```

