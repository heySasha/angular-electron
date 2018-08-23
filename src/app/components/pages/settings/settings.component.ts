import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../providers/electron.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
    public utils: Map<string, any> = new Map<string, string>([
        ['nmap', ''],
        ['git', '']
    ]);

    constructor(private readonly electronService: ElectronService,
                private cdr: ChangeDetectorRef) {
      console.log('=====SettingsComponent(constructor)=======');
    }

    ngOnInit() {
    }

    // todo fix changeDetection Pipe
    public checkUtil(util: string) {
        console.log(util);

        const _util = this.electronService.childProcess.spawn(util, ['--version']);

        _util.stdout.on('data', (data) => {
            this.utils.set(util, 'ssssssssssssss');
            // this.cdr.markForCheck();
        });

        _util.on('error', () => {
            this.utils.set(util, 'Please, install util!');
            // this.cdr.markForCheck();
        });


        console.log(this.utils);
    }
}
