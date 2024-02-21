import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  // Productos agregados al carrito
  shoppingCart: Product[] = [];

  // Total del carrito
  total: number = 0;

  constructor() { }

  // Agregar producto al carrito
  addtoCart(product: Product) {
    this.shoppingCart.push(product);
  }

  // Calcular el total de carrito
  getTotal() {
    return this.total = this.shoppingCart.reduce((sum, item) => sum + item.price, 0)
  }

  // Getter shoppingCart
  getShoppingCart() {
    return this.shoppingCart;
  }

}
