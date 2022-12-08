import { CartPizza } from "./cart-pizza.model";
import { CartSide } from "./cart-side.model";

export class CartOrder {
    pizzas: CartPizza[] = [];
    sides: CartSide[] = [];
}