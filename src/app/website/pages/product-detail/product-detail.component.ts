import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // Almacenar ID del producto
  productID: string | null = null;
  // Almacenar los datos del producto solicitado
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        // Obtener el ID de la URL
        this.productID = params.get('id');

        // Obtener el producto desde la API usando el ID
        if (this.productID) {
          return this.productsService.getProduct(this.productID)
        }

        return [null];
      })
    )
    .subscribe(data => {
      this.product = data;
    });
  }

  // Lógica del boton '< Back'
  goBack() {
    this.location.back();
  }

}
