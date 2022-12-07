import { Component, Input } from '@angular/core';
import { PizzaResponse, Size } from 'src/app/shared/api-client';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent {
  @Input()
  pizza: PizzaResponse | undefined;

  quantity: number = 1;

  constructor(private cartService: CartService) {}

  onAddToCart() {
    this.cartService.addPizza(Size.Small, this.quantity, this.pizza?.ingredients?.map(i => i.id!)!);
  }
}
