import { Component } from '@angular/core';
import { fillRange } from '../../../../../utils';
import { HostsService } from '../../../../../providers/hosts.service';

@Component({
    selector: 'app-scanning',
    templateUrl: './scanning.component.html',
    styleUrls: ['./scanning.component.scss']
})
export class ScanningComponent {

    constructor(private hostsService: HostsService) {
    }
}
