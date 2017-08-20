import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'propertyFilter'
})

@Injectable()
export class PropsFilterPipe implements PipeTransform {
 transform(items: any[], property: string, searchValues: string): any[] {
   if (!items) return [];
   return items.filter(it => 
    it[property].toString().toLowerCase().indexOf(searchValues) !== -1 );
 }
}