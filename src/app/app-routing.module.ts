import { HomeComponent } from './components/pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostsComponent } from './components/pages/hosts/hosts.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { LogsComponent } from './components/pages/logs/logs.component';

const routes: Routes = [{
    path: 'scans',
    component: HomeComponent
}, {
    path: 'logs',
    component: LogsComponent
}, {
    path: 'hosts',
    component: HostsComponent
}, {
    path: 'settings',
    component: SettingsComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
