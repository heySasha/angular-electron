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
    db: any = null;

    constructor() {
        console.log('=====ElectronService(constructor)=======');

        // Conditional imports
        if (this.isElectron()) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.webFrame = window.require('electron').webFrame;
            this.remote = window.require('electron').remote;

            this.childProcess = window.require('child_process');
            this.fs = window.require('fs');

            MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
                .then(client => {
                    console.log('Connection to DB!');
                    this.db = client.db('main');
                })
                .catch(() => {
                    console.log('Not connection to DB!');
                });
        }
    }

    isElectron = () => {
        return window && window.process && window.process.type;
    }

    // public async DB() {
    //   console.log('=====ElectronService(DB)=======');
    //
    //   if (this.db) {
    //         return this.db;
    //     }
    //
    //
    //     try {
    //         const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
    //         this.db = client.db('main');
    //
    //         return this.db;
    //     } catch (e) {
    //         throw new Error('Not connection to DB!');
    //     }
    // }
}
