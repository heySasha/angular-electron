import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../providers/electron.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
    public utils: Map<string, any> = new Map<string, string>([
        ['nmap', ''],
        ['git', '']
    ]);

    constructor(private readonly electronService: ElectronService,
                private readonly cdr: ChangeDetectorRef) {
      console.log('=====SettingsComponent(constructor)=======');
    }

    ngOnInit() {
    }

    public checkUtil(util: string) {
        const _util = this.electronService.childProcess.spawn(util, ['--version']);

        _util.stdout.on('data', (data) => {
            this.utils.set(util, data);
            this.cdr.detectChanges();
        });

        _util.on('error', () => {
            this.utils.set(util, 'Please, install util!');
            this.cdr.detectChanges();
        });

        console.log(this.utils);
    }
}
