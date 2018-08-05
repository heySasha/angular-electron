import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

import { MongoClient } from 'mongodb';

@Injectable()
export class ElectronService {

    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    remote: typeof remote;
    childProcess: typeof childProcess;
    fs: typeof fs;

    private db: any|null = null;

    constructor() {
        // Conditional imports
        if (this.isElectron()) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.webFrame = window.require('electron').webFrame;
            this.remote = window.require('electron').remote;

            this.childProcess = window.require('child_process');
            this.fs = window.require('fs');
        }
    }

    isElectron = () => {
        return window && window.process && window.process.type;
    };

    public async DB() {
        if (this.isConnectDB()) {
            return this.db;
        }

        const url = 'mongodb://localhost:27017';
        const dbName = 'myproject';

        try {
            this.db = await MongoClient.connect(url);
            return this.db;
        } catch (e) {
            throw new Error('Not connection to DB!');
        }
    }

    public isConnectDB() {
        return !!this.db;
    }
}
