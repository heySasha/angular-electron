import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupernovaGridComponent } from './supernova-grid.component';

@NgModule({
    declarations: [
        SupernovaGridComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    exports: [
        SupernovaGridComponent
    ],
    providers: [],
    bootstrap: []
})
export class SupernovaGridModule {
}
