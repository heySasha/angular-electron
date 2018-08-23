import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HostsComponent } from './components/pages/hosts/hosts.component';
import { SettingsComponent } from './components/pages/settings/settings.component';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HostsService} from './providers/hosts.service';
import { AddingComponent } from './components/pages/home/components/adding/adding.component';
import { LogsComponent } from './components/pages/logs/logs.component';
import { SupernovaGridModule } from './components/supernova-grid/supernova-grid.module';
import { ScanningComponent } from './components/pages/home/components/scanning/scanning.component';
import { ScanPort } from './utils/scanPort';
import { InfoObj, Scan } from './utils/IScan';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AddingComponent,
        ScanningComponent,
        LogsComponent,
        SettingsComponent,
        HostsComponent,
        WebviewDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SupernovaGridModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        ElectronService,
        HostsService,
        ScanPort,
        Scan,
        InfoObj
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
