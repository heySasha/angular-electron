export interface IScan {
    init?(model: any, data: any, processes: number);
    run(query: any, projection: any, processes: number);
    reset?();
    info();
}

export class InfoObj {
    public total = 0;
    public success = 0;
    public nmapErrors = 0;
    public mongoErrors = 0;
    public allRunning = 0;
}

export class Scan {
    private child: any;

    public set process(child) {
        this.child = child;
    }

    public data(callback) {
        this.child.stdout.on('data', callback);
    }

    public error(callback) {
        this.child.stderr.on('data', callback);
    }

    public close(callback) {
        this.child.on('close', callback);
    }
}
