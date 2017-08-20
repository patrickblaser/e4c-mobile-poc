import { Injectable, Pipe, PipeTransform } from '@angular/core';
import _ from "lodash";

@Pipe({
 name: 'notExistsFilter'
})

@Injectable()
export class NotExistsFilterPipe implements PipeTransform {
 transform(items: any[], field: string, values: any[]): any[] {
   if (!items) return [];
   return items.filter(it => 
    _.findIndex(values, function(item) { return item[field] == it[field] }) == -1 );
 }
}