import { Injectable, OnInit } from '@angular/core';
import { ElectronService } from './electron.service';

import * as randomstring from 'randomstring';
import { Observable } from 'rxjs';

@Injectable()
export class HostsService implements OnInit {
    private hosts: any = null;

    constructor(private electronService: ElectronService) {
        const interval = setInterval(() => {
            if (this.electronService.db) {
                clearInterval(interval);
                this.hosts = this.electronService.db.collection('hosts');
            }
        }, 2000);
    }

    ngOnInit() {
        console.log('=====HostsService(ngOnInit)=======');
    }

    get collection() {
        return this.hosts;
    }

    public getMany(query: any = {}) {
        return Observable.create((observer) => {
            const interval = setInterval(async () => {
                if (this.hosts) {
                    clearInterval(interval);
                    observer.next(await this.hosts.find(query).toArray());
                }
            }, 10);
        });
    }

    public add() {
        const host = {name: randomstring.generate(8), country: randomstring.generate(8)};
        this.hosts.insertOne(host);
    }

    public insertMany(hosts: any[]) {
        return this.hosts.insertMany(hosts);
    }
}

