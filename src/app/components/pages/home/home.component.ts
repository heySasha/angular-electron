import { Component, OnInit } from '@angular/core';
import { fillRange } from '../../../utils';
import { HostsService } from '../../../providers/hosts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private hostsService: HostsService) { }

  ngOnInit() {
  }

  public addHosts(range: string, country: string) {
      console.log(range, country);
      const Ips = fillRange(range);

      const hosts = Ips.map(ip => ({ip, country}));

      console.log(hosts);
      this.hostsService.insertMany(hosts);
  }
}
