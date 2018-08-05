import { HomeComponent } from './components/pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostsComponent } from './components/pages/hosts/hosts.component';
import { SettingsComponent } from './components/pages/settings/settings.component';

const routes: Routes = [{
    path: '',
    component: HomeComponent
}, {
    path: 'settings',
    component: SettingsComponent
}, {
    path: 'hosts',
    component: HostsComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
