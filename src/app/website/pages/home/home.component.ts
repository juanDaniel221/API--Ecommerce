import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from "../../../services/products.service";
import { Product } from '../../../models/product.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Almacena los productos traidos de la API
  products: Product[] = [];
  // Paginación de las consultas a la API
  limit: number = 10;
  offset: number = 0;
  // Almacenar el ID de un producto. Viene en los query params
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener productos desde la API
    this.productsService.getProducts(10, 0)
    .subscribe(data => {
      this.products = data;
    });

    // Obtener parametros tipo query
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    })
  }

  // Obtener productos desde la API
  onLoadMore() {
    this.productsService.getProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

  ngOnDestroy(): void {
    this.route.queryParamMap.subscribe();
  }

}
