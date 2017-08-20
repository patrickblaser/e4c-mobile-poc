import { Injectable, Pipe, PipeTransform } from '@angular/core';
import _ from "lodash";

@Pipe({
 name: 'existsFilter'
})

@Injectable()
export class ExistsFilterPipe implements PipeTransform {
 transform(items: any[], field: string, values: any[]): any[] {
   if (!items) return [];
   return items.filter(it => 
    _.findIndex(values, function(item) { return item[field] == it[field] }) >= 0 );
 }
}