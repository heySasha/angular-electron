import { IScan } from './IScan';

const { spawn } = require('child_process');

export class ScanLogin implements IScan {
    private total: number;
    private success: number;
    private nmapErrors: number;
    private mongoErrors: number;
    private allRunning: number;

    private processes: number;
    private hosts: any[];
    private model: any;

    constructor() {
        this.reset();
    }

    public run() {
        const {length} = this.hosts;
        let {processes} = this;
        if (processes > length) {
            processes = length;
        }

        const range = Math.floor(length / processes);

        let i = 0;
        while (i + range < length) {
            this.scan(this.hosts.slice(i, i + range));
            i += range;
        }
        this.scan(this.hosts.slice(i));
    }

    public reset() {
        this.total = 0;
        this.success = 0;
        this.mongoErrors = 0;
        this.nmapErrors = 0;
        this.allRunning = (this.hosts && this.hosts.length) || 0;
    }

    public info() {
        const {total, success, nmapErrors, mongoErrors, allRunning} = this;

        return {allRunning, total, success, nmapErrors, mongoErrors};
    }


    public init(model, hosts, processes = 10) {
        this.model = model;
        this.hosts = hosts;
        this.processes = processes;

        this.reset();
    }

    private scan(hosts: any[]) {
        const {_id} = hosts.pop();
        const nmap = spawn('nmblookup', ['-A', _id]);

        nmap.stdout.on('data', async (data) => {
            const res = ScanLogin.parse(data);

            if (ScanLogin.isSuccess(res, _id)) {
                console.log({isSuccess: true});

                this.success++;

                try {
                    await this.model.updateOne({_id}, {$set: ScanLogin.format(res)});
                } catch (e) {
                    this.mongoErrors++;
                    console.error('---mongo error---');
                }
            }
        });

        nmap.stderr.on('data', () => {
            this.nmapErrors++;
            console.error('---nmap error---');
        });

        nmap.on('close', async () => {
            this.total++;
            await this.model.updateOne({_id}, {$set: {scanLoginAt: Date()}});

            if (hosts.length) {
                this.scan(hosts);
            }
        });
    }

    static isSuccess (data, host): boolean {
        console.log('isSuccess', {data});
        return !data.includes(`No reply from ${host}`);
    }

    static format(data): Object {
        return {messageLogin: data};
    }

    static parse(data) {
        return data
            .toString()
            .split('\n')
            .filter(item => item.trim() !== '');
    }
}
