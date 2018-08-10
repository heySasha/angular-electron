import {Injectable, OnInit} from '@angular/core';
import { ElectronService } from './electron.service';

@Injectable()
export class HostsService implements OnInit {
  private hosts: any = null;

  constructor(private electroService: ElectronService) {
    console.log('=====HostsService(constructor)=======');

    this.hosts = this.electroService.db.collection('hosts');
  }

  ngOnInit() {
    console.log('=====HostsService(ngOnInit)=======');

    // this.electroService.DB().then((db) => {
    //   this.hosts = db.collection('hosts');
    //   console.log('--------Hosts connection!--------');
    // }, console.log);
  }

  // public init() {
  //   this.electroService.DB().then((db) => {
  //     this.hosts = db.collection('hosts');
  //     console.log('--------Hosts connection!--------');
  //   }, console.log);
  // }

  public getMany() {
    return this.hosts.find({}).toArray();
  }

  public add(host: any) {
    this.hosts.insert(host);
  }
}
