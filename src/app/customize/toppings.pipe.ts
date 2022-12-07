import { Pipe, PipeTransform } from '@angular/core';
import { IngredientResponse, IngredientType } from '../shared/api-client';

@Pipe({
  name: 'toppings'
})
export class ToppingsPipe implements PipeTransform {

  transform(value: IngredientResponse[] | undefined): IngredientResponse[] {
    return value?.filter(v => v.ingredientType == IngredientType.Topping) ?? [];
  }

}
