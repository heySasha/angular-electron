import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-supernova-grid',
    templateUrl: 'supernova-grid.component.html',
    styleUrls: ['supernova-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SupernovaGridComponent implements OnInit {
    public tableConfig: any;
    public visibilityCols: Array<any>;
    public tableId: string;
    public data: Array<any>;

    private model: any;
    private filters: any = {};
    private filtersAnd: any[] = [];

    @Input()
    set config(data: any) {
        this.tableConfig = data;
        this.visibilityCols = data.params.colModel.filter(({hidden}) => !hidden);
        this.tableId = data.tableId;
        this.model = data.model;
    }

    constructor(private readonly cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.getData();
    }

    public  select() {
        // console.log(value);
    }

    public selectAll() {
    }

    public reload() {
        this.getData();
    }

    public sortable(col) {
        col.sortable.isAsc = !col.sortable.isAsc;
    }

    public filtration(colName: string, value: string, type: string) {
        const index = this.filtersAnd.findIndex(item => item[colName]);

        const filter = type === 'input' ? {[colName]: {$regex: value, $options: 'si'}} : {[colName]: value};

        if (index !== -1) {
            if (this.filtersAnd[index][colName] === value) {
                return;
            }

            if (!value) {
                this.filtersAnd.splice(index, 1);
            } else {
                this.filtersAnd[index] = filter;
            }
        } else {
            if (!value) {
                return;
            }

            this.filtersAnd.push(filter);
        }

        if (this.filtersAnd.length) {
            this.filters = {$and: this.filtersAnd};
        } else {
            this.filters = {};
        }

        this.getData();
    }

    private getData() {
        this.model.getMany(this.filters)
            .subscribe(data => {
                console.log({data});
                this.data = data;
                this.cdr.detectChanges();
            });
    }
}
