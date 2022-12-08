import { Component } from '@angular/core';
import { OrderService } from '../shared/api-client';
import { CartPizza } from '../shared/models/cart-pizza.model';
import { CartSide } from '../shared/models/cart-side.model';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  orderId = 0;

  constructor(public cartService: CartService, private orderService: OrderService) {}

  onRemovePizza(pizza: CartPizza) {
    this.cartService.removePizza(pizza);
  }

  onRemoveSide(side: CartSide) {
    this.cartService.removeSide(side);
  }

  onPlaceOrder() {
    const createOrderRequest = this.cartService.toCreateOrderRequest();
    this.orderService.orderPost(createOrderRequest)
      .subscribe(data => this.orderId = data.id);
  }

  onNotificationClose() {
    this.orderId = 0;
  }
}
