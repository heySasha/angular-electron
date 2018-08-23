import { InfoObj, IScan, Scan } from './IScan';
import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { HostsService } from '../providers/hosts.service';

@Injectable()
export class ScanPort implements IScan {
    constructor(
        private readonly electronService: ElectronService,
        private readonly hostsService: HostsService,
        private readonly scanProcess: Scan,
        private readonly infoObj: InfoObj) {
    }

    public async run(query, projection = {limit: 0}, processes = 20) {
        const hosts = await this.hostsService.collection.find(query).limit(projection.limit).toArray();

        console.log(hosts);
        const range = Math.floor(hosts.length / processes) || 1;

        while (hosts.length) {
            this.scan(hosts.splice(0, range));
        }
    }

    public info() {
        return this.infoObj;
    }

    private scan(hosts) {
        const host = hosts.pop();

        this.scanProcess.process = this.electronService.childProcess.spawn('nmap', ['-Pn', '-p3389', host._id]);
        // todo spawn('nmblookup', ['-A', _id]); for scan login

        this.scanProcess.data(async (data) => {
            const res = ScanPort.parse(data);

            if (ScanPort.isSuccess(res)) {
                this.infoObj.success++;

                try {
                    await this.hostsService.collection.updateOne({_id: host._id}, {$set: ScanPort.formatData(res)});
                } catch (e) {
                    this.infoObj.mongoErrors++;
                }
            }
        });

        this.scanProcess.error(() => {
            this.infoObj.nmapErrors++;
        });

        this.scanProcess.close(async () => {
            this.infoObj.total++;
            await this.hostsService.collection.updateOne({_id: host._id}, {$set: {scanAt: Date()}});

            if (hosts.length) {
                this.scan(hosts);
            }
        });
    }

    static isSuccess (data) {
        return data.includes('3389/tcp') && data.includes('open');
    }

    static formatData(data) {
        return {message: data.join('')};
    }

    static parse(data) {
        const str = data.toString();
        return str.split('\n')
            .map(item => item.split(' ').filter(i => i !== ''))
            .reduce((res, item) => ([...res, ...item]), []);
    }
}
