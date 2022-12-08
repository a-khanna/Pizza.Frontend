import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IngredientResponse, IngredientService, IngredientType, PizzaResponse, Size } from '../shared/api-client';
import { CartIgredient } from '../shared/models/cart-ingredient.model';
import { CartService } from '../shared/services/cart.service';
import { CustomizeService } from '../shared/services/customize.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit, OnDestroy {
  isCustomization: boolean = false;

  size: Size = Size.Small;
  sauceId?: number;
  extraCheese: boolean = false;
  cheeseId?: number;
  toppingIds: number[] = [];
  quantity: number = 1;
  price: number = 0;

  allIngredientsObs?: Observable<IngredientResponse[]>;
  allIngredients?: IngredientResponse[];
  subs?: Subscription;

  constructor(private ingredientService: IngredientService, private cartService: CartService, private customizeService: CustomizeService) {}

  ngOnInit(): void {
    this.allIngredientsObs = this.ingredientService.ingredientsGet();
    this.subs = this.allIngredientsObs.subscribe(ings => {
      this.allIngredients = ings;
      this.cheeseId = ings.find(i => i.ingredientType == IngredientType.Cheese)?.id;
      if (this.customizeService.pizza) {
        let pizza = this.customizeService.pizza;
        this.isCustomization = true;
        this.size = pizza.size!;
        this.quantity = pizza.quantity!;
        this.extraCheese = pizza.ingredients?.map(i => i.id).includes(this.cheeseId) ?? false;
        const sauceIds = ings.filter(i => i.ingredientType == IngredientType.Sauce).map(i => i.id);
        this.sauceId = sauceIds.find(s => pizza.ingredients?.map(i => i.id).includes(s));
        this.toppingIds = pizza.ingredients?.filter(i => i.id != this.cheeseId || i.id != this.sauceId).map(i => i.id!)!;

        this.customizeService.clearPizza();
      }
    });
  }

  ngDoCheck() {
    this.calculatePrice();
  }

  calculatePrice() {
    this.price = 0;
    if (this.size == Size.Small)
      this.price += 50;
    else if (this.size == Size.Medium)
      this.price += 80;
    else
      this.price += 100;

    let saucePrice = this.allIngredients?.find(i => i.id == this.sauceId)?.price;
    let cheesePrice = this.extraCheese ? this.allIngredients?.find(i => i.id == this.cheeseId)?.price : 0;
    this.price += (saucePrice ?? 0) + (cheesePrice ?? 0)

    for(var toppingId of this.toppingIds)
      this.price += (this.allIngredients?.find(i => i.id == toppingId)?.price) ?? 0;

    this.price *= this.quantity;
  }

  onToppingClick(element: EventTarget | null, toppingId?: number) {
    if ((<HTMLInputElement>element).checked) {
      this.toppingIds.push(toppingId!);
    } else {
      this.toppingIds = this.toppingIds.filter(t => t !== toppingId);
    }
  }

  onAddToCart() {
    let ings: CartIgredient[] = [];
    if (this.cheeseId) {
      ings.push({
        id: this.cheeseId,
        name: this.allIngredients?.find(i => i.id == this.cheeseId)?.name!
      });
    }

    for (var toppingId of this.toppingIds) {
      ings.push({
        id: toppingId,
        name: this.allIngredients?.find(i => i.id == toppingId)?.name!
      });
    }
    this.cartService.addPizza('Custom Pizza', this.size, this.quantity, ings);
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
