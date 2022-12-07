export * from './ingredient.service';
import { IngredientService } from './ingredient.service';
export * from './order.service';
import { OrderService } from './order.service';
export * from './pizza.service';
import { PizzaService } from './pizza.service';
export * from './side.service';
import { SideService } from './side.service';
export const APIS = [IngredientService, OrderService, PizzaService, SideService];
