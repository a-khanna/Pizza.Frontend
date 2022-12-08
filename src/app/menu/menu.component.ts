import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PizzaResponse, PizzaService, SideResponse, SideService } from '../shared/api-client';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pizzas?: Observable<Array<PizzaResponse>>;
  sides?: Observable<Array<SideResponse>>;

  constructor(private pizzaService: PizzaService, private sideService: SideService) { }

  ngOnInit(): void {
    this.pizzas = this.pizzaService.pizzasGet();
    this.sides = this.sideService.sidesGet();
  }
}
