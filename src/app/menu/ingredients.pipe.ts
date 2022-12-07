import { Pipe, PipeTransform } from '@angular/core';
import { IngredientResponseBase } from '../shared/api-client';

@Pipe({
  name: 'ingredients'
})
export class IngredientsPipe implements PipeTransform {

  transform(value: Array<IngredientResponseBase> | null | undefined): string | undefined {
    return value?.map(v => v.name).join(" | ");
  }

}
