import { Component } from '@angular/core';
import { fillRange } from '../../../../../utils';
import { HostsService } from '../../../../../providers/hosts.service';

@Component({
    selector: 'app-adding',
    templateUrl: './adding.component.html'
})
export class AddingComponent {

    constructor(private hostsService: HostsService) {
    }

    public addHosts(range: string, country: string) {
        const hosts = fillRange(range).map(ip => ({ip, country}));
        this.hostsService.insertMany(hosts);
    }
}
