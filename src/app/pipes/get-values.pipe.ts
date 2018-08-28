import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'getValues', pure: false})
export class GetValuesPipe implements PipeTransform {

    constructor() {
    }

    transform(map: Map<any, any>): any[] {
        const ret = [];

        map.forEach((val, key) => {
            ret.push({
                key: key,
                val: val
            });
        });

        return ret;
    }
}
