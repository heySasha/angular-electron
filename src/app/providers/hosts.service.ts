import { Injectable, OnInit } from '@angular/core';
import { ElectronService } from './electron.service';

import * as randomstring from 'randomstring';

@Injectable()
export class HostsService implements OnInit {
    private hosts: any = null;

    constructor(private electroService: ElectronService) {
        this.hosts = this.electroService.db.collection('hosts');
    }

    ngOnInit() {
        console.log('=====HostsService(ngOnInit)=======');
    }

    public getMany(query: any = {}) {
        console.log(query);

        return this.hosts.find(query).toArray();
    }

    public add() {
        const host = {name: randomstring.generate(8), country: randomstring.generate(8)};

        this.hosts.insert(host);
    }

    public insertMany(hosts: any[]) {
        return this.hosts.insertMany(hosts);
    }
}

