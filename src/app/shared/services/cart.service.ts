import { Injectable } from '@angular/core';
import { CreateOrderRequest, Size } from '../api-client';
import { CartIgredient } from '../models/cart-ingredient.model';
import { CartOrder } from '../models/cart-order.model';
import { CartPizza } from '../models/cart-pizza.model';
import { CartSide } from '../models/cart-side.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  order: CartOrder = {
    pizzas: [],
    sides: []
  };

  addPizza(name: string, size: Size, quantity: number, ingredients: CartIgredient[]) {
    this.order.pizzas?.push({
      name,
      size,
      quantity,
      ingredients
    })
  }

  removePizza(pizza: CartPizza) {
    const index = this.order.pizzas.indexOf(pizza);
    this.order.pizzas.splice(index, 1);
  }

  addSide(id: number, name: string, quantity: number) {
    this.order.sides?.push({
      id,
      name,
      quantity
    })
  }

  removeSide(side: CartSide) {
    const index = this.order.sides.indexOf(side);
    this.order.sides.splice(index, 1);
  }

  cartLength() {
    return this.order.pizzas!.length + this.order.sides!.length;
  }

  toCreateOrderRequest() {
    const createOrderRequest: CreateOrderRequest = {
      pizzas: [],
      sides: []
    };

    for (let pizza of this.order.pizzas) {
      createOrderRequest.pizzas?.push({
        size: pizza.size,
        quantity: pizza.quantity,
        ingredients: pizza.ingredients?.map(i => { return {id: i.id, name: i.name} })
      });
    }

    for (let side of this.order.sides) {
      createOrderRequest.sides?.push({
        id: side.id,
        quantity: side.quantity
      });
    }

    return createOrderRequest;
  }
}
