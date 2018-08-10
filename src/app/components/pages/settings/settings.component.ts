import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../providers/electron.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public utils: Map<string, any> = new Map<string, any>();

    constructor(private electronService: ElectronService) {
      console.log('=====SettingsComponent(constructor)=======');
    }

    ngOnInit() {
    }

    public checkUtil(util: string) {
        const {spawn} = this.electronService.childProcess;

        try {
          const _util = spawn(util, ['--version']);

          _util.stdout.on('data', (data) => {
            this.utils.set(util, data);
          });

          _util.on('error', () => {
            this.utils.set(util, 'Please, install util!');
          });
        } catch (e) {
          this.utils.set(util, e);
        }
    }
}
