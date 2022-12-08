import { Component, Input } from '@angular/core';
import { SideResponse } from 'src/app/shared/api-client';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {
  @Input()
  side: SideResponse | undefined;

  quantity: number = 1;

  constructor(private cartService: CartService) {}

  onAddToCart() {
    this.cartService.addSide(this.side!.id!, this.side!.name!, this.quantity);
  }
}
