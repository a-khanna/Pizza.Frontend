import { Injectable } from '@angular/core';
import { CreateOrderRequest, Size } from '../api-client';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  order: CreateOrderRequest = {
    pizzas: [],
    sides: []
  };

  addPizza(size: Size, quantity: number, ingredientIds: number[]) {
    this.order.pizzas?.push({
      size,
      quantity,
      ingredients: ingredientIds.map(i => {return {id: i}})
    })
    console.log(this.order);
  }

  addSide(id: number, quantity: number) {
    this.order.sides?.push({
      id,
      quantity
    })
    console.log(this.order);
  }

  cartLength() {
    return this.order.pizzas!.length + this.order.sides!.length;
  }
}
