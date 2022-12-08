import { Injectable } from '@angular/core';
import { PizzaOrderRequest } from '../api-client';

@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
    pizza: PizzaOrderRequest | undefined;

    clearPizza() {
      this.pizza = undefined;
    }
}