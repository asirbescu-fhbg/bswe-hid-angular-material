import { Pipe, PipeTransform } from '@angular/core';
import { ChildResponse } from './shared/interfaces/Child';
import { StoreService } from './shared/store.service';

@Pipe({
  name: 'filterKindergardens',
  pure: false
})
export class FilterKindergardensPipe implements PipeTransform {

  transform(value: ChildResponse[], kindergarden: string): ChildResponse[] {
    if (value.length === 0 || !kindergarden) {
      return value;
    }

    let filteredChildren: ChildResponse[] = [];
    for (let child of value) {
      if (child.kindergarden.name == kindergarden) {
        filteredChildren.push(child);
      }
    }

    return filteredChildren;

  }

}
