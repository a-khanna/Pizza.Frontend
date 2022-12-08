import { Pipe, PipeTransform } from '@angular/core';
import { IngredientResponse, IngredientType } from '../shared/api-client';

@Pipe({
  name: 'sauces'
})
export class SaucesPipe implements PipeTransform {

  transform(value?: IngredientResponse[]): IngredientResponse[] {
    return value?.filter(v => v.ingredientType == IngredientType.Sauce) ?? [];
  }

}
