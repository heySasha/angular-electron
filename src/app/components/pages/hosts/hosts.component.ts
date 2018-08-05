import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../providers/electron.service';

@Component({
    selector: 'app-hosts',
    templateUrl: './hosts.component.html',
    styleUrls: ['./hosts.component.scss']
})
export class HostsComponent implements OnInit {
    public tableParam = {
        tableId: 'example-table',
        // model: this.usersModel,
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
                {label: 'First name', name: 'first_name', filtration: {type: 'input'}, sortable: {isAsc: true}},
                {
                    label: 'Last name',
                    name: 'last_name',
                    filtration:
                        {
                            type: 'select',
                            config: [{key: '', value: 'All'}, {key: 'one', value: 'One'}, {key: 'two', value: 'Two'}]
                        }
                },
            ]
        }
    };

    constructor(private electronService: ElectronService) {
    }

    ngOnInit() {
    }
}
