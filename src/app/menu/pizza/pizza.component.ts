import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaResponse, Size } from 'src/app/shared/api-client';
import { CartIgredient } from 'src/app/shared/models/cart-ingredient.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent {
  @Input()
  pizza: PizzaResponse | undefined;

  quantity: number = 1;

  constructor(private router: Router, private cartService: CartService, private customizeService: CustomizeService) {}

  onAddToCart() {
    const ings: CartIgredient[] = [];
    for (let ing of this.pizza?.ingredients!) {
      ings.push({
        id: ing.id,
        name: ing.name!
      });
    }
    this.cartService.addPizza(this.pizza!.name!, Size.Small, this.quantity, ings);
  }

  onCustomize() {
    this.customizeService.pizza = {
      size: Size.Small,
      quantity: this.quantity,
      ingredients: this.pizza?.ingredients?.map(i => { return {id: i.id!}})
    };
    this.router.navigate(['/build']);
  }
}
