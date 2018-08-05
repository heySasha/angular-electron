import { Component, Input } from '@angular/core';

@Component({
  selector: 'supernova-grid',
  templateUrl: 'supernova-grid.component.html',
  styleUrls: ['supernova-grid.component.scss']
})

export class SupernovaGridComponent {
  public tableConfig: any;
  private model: any;
  private filters: any = {$and: []};

  public visibilityCols: Array<any>;
  public tableId: string;
  public data: Array<any>;

  @Input()
  set config(data: any) {
    this.tableConfig = data;
    this.visibilityCols = data.params.colModel.filter(({hidden}) => !hidden);
    this.tableId = data.tableId;
    this.model = data.model;

    this.getData();
  }

  constructor() {
  }

  public  select(value) {
    console.log(value);
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
    const index = this.filters.$and.findIndex(item => item[colName]);
    const filter = type === 'input' ? {[colName]: {$regex: value, $options: 'si'}} : {[colName]: value};

    if (index !== -1) {
      if (this.filters.$and[index][colName] === value) {
        return;
      }

      if (!value) {
        this.filters.$and.splice(index, 1);
      } else {
        this.filters.$and[index] = filter;
      }
    } else {
      if (value) {
        this.filters.$and.push(filter);
      }
    }

    this.getData();
  }

  private getData() {
    this.model
      .get(this.filters)
      .subscribe(data => this.data = data);
  }
}
