import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule, BASE_PATH } from './shared/api-client';
import { HeaderComponent } from './header/header.component';
import { PizzaComponent } from './menu/pizza/pizza.component';
import { IngredientsPipe } from './menu/ingredients.pipe';
import { MenuComponent } from './menu/menu.component';
import { SideComponent } from './menu/side/side.component';
import { RupeePipe } from './menu/rupee.pipe';
import { RouterModule, Routes } from '@angular/router';
import { CustomizeComponent } from './customize/customize.component';
import { SaucesPipe } from './customize/sauces.pipe';
import { ToppingsPipe } from './customize/toppings.pipe';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'build', component: CustomizeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PizzaComponent,
    IngredientsPipe,
    MenuComponent,
    SideComponent,
    CustomizeComponent,
    RupeePipe,
    SaucesPipe,
    ToppingsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{ provide: BASE_PATH, useValue: 'https://localhost:7199' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
