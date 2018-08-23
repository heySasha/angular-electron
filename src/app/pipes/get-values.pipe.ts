import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'getValues', pure: false})
export class GetValuesPipe implements PipeTransform {

    constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    transform(map: Map<any, any>): any[] {
        const ret = [];

        map.forEach((val, key) => {
            ret.push({
                key: key,
                val: val
            });
        });

        console.log(ret);

        return ret;
    }
}
