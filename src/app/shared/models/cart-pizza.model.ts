import { PizzaOrderRequest, Size } from '../api-client';
import { CartIgredient } from './cart-ingredient.model';

export class CartPizza implements PizzaOrderRequest {
    name?: string;
    size?: Size;
    quantity?: number;
    ingredients?: CartIgredient[] | null;
}