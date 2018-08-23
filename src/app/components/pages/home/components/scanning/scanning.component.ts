import { Component } from '@angular/core';
import { HostsService } from '../../../../../providers/hosts.service';
import { ScanPort } from '../../../../../utils/scanPort';

@Component({
    selector: 'app-scanning',
    templateUrl: './scanning.component.html',
    styleUrls: ['./scanning.component.scss']
})
export class ScanningComponent {

    constructor(private hostsService: HostsService,
                private scanPort: ScanPort) {
    }

    public onScan() {
        this.scanPort.run({}, {limit: 2}).then(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }
}
