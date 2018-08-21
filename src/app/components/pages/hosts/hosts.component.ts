import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../providers/electron.service';
import {HostsService} from '../../../providers/hosts.service';

@Component({
    selector: 'app-hosts',
    templateUrl: './hosts.component.html',
    styleUrls: ['./hosts.component.scss']
})
export class HostsComponent implements OnInit {
    public tableParam = {
        tableId: 'example-table',
        model: this.hostsService,
        checkboxFields: true,
        params: {
            rowNum: 30,
            multiSelect: true,
            filterColumn: true,
            postData: {
                filters: {}
            },
            colModel: [
                {name: 'id', key: true, hidden: true},
                {label: 'Ip', name: 'ip', filtration: {type: 'input'}, sortable: {isAsc: true}},
                {label: 'Country', name: 'country', filtration: {type: 'input'}, sortable: {isAsc: true}},
                {label: 'Nmap', name: 'nmap', filtration: {type: 'input'}, sortable: {isAsc: true}}
                // {
                //     label: 'Last name',
                //     name: 'last_name',
                //     filtration:
                //         {
                //             type: 'select',
                //             config: [{key: '', value: 'All'}, {key: 'one', value: 'One'}, {key: 'two', value: 'Two'}]
                //         }
                // },
            ]
        }
    };

    constructor(private electronService: ElectronService,
                private hostsService: HostsService) {
    }

    ngOnInit() {
      // this.hostsService.init();
    }

    public getHosts() {
      // this.hostsService.add({name: 'Test'});
      const hosts = this.hostsService.getMany().then(console.log);

      console.log({hosts});
    }

    public addHost() {
      this.hostsService.add();
    }
}
