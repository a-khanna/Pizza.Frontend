import { Pipe, PipeTransform } from '@angular/core';
import { IngredientResponseBase } from './api-client';
import { CartIgredient } from './models/cart-ingredient.model';

@Pipe({
  name: 'ingredients'
})
export class IngredientsPipe implements PipeTransform {

  transform(value: IngredientResponseBase[] | CartIgredient[] | null | undefined): string | undefined {
    return value?.map(v => v.name).join(" | ");
  }

}
