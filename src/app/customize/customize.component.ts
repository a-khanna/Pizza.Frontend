import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IngredientResponse, IngredientService, IngredientType, PizzaResponse, Size } from '../shared/api-client';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit, OnDestroy {
  @Input()
  pizza: PizzaResponse | undefined;

  size: Size = Size.Small;
  sauceId: number | undefined;
  extraCheese: boolean = false;
  cheeseId: number | undefined;
  toppingIds: number[] = [];
  quantity: number = 1;
  price: number = 0;

  allIngredientsObs: Observable<Array<IngredientResponse>> | undefined;
  allIngredients: Array<IngredientResponse> | undefined;
  subs: Subscription | undefined;

  constructor(private ingredientService: IngredientService, private cartService: CartService) { }

  ngOnInit(): void {
    this.allIngredientsObs = this.ingredientService.ingredientsGet();
    this.subs = this.allIngredientsObs.subscribe(ings => {
      this.allIngredients = ings;
      this.cheeseId = ings.find(i => i.ingredientType == IngredientType.Cheese)?.id;
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

  onToppingClick(element: EventTarget | null, toppingId: number | undefined) {
    if ((<HTMLInputElement>element).checked) {
      this.toppingIds.push(toppingId!);
    } else {
      this.toppingIds = this.toppingIds.filter(t => t !== toppingId);
    }
  }

  onAddToCart() {
    console.log(this.cheeseId);
    let ingIds = [this.sauceId!, this.cheeseId!, ...this.toppingIds]
    this.cartService.addPizza(this.size, this.quantity, ingIds);
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
