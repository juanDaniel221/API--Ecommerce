import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../../models/product.model';
import { StoreService } from '../../../services/store.service'
import { ProductsService } from "../../../services/products.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {

  // Productos agregados al carrito
  shoppingCart: Product[] = [];
  // Total del carrito
  total: number = 0;
  // Mostrar detalle del producto
  showProductDetail: boolean = false;
  // ID del producto al que se va a mostrar el detalle
  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowProductDetail(id);
    }
  };
  // Producto elegido para mostrar el detale
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: ''
  };
  // Paginación de las consultas a la API
  limit: number = 10;
  offset: number = 0;
  // Estado de la petición del detalle de un producto
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  @Input() products: Product[] = []

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.shoppingCart = this.storeService.getShoppingCart();
  }

  // Recibir el producto agregado al carrito
  onAddedProduct(product: Product) {
    this.storeService.addtoCart(product);
    this.total = this.storeService.getTotal()
  }

  // Mostrar/ocultar detalle del producto
  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  // Hacer una petición del producto que se quiere mostrar en el detalle
  onShowProductDetail(id: string) {
    this.statusDetail = 'loading';

    // Mostrar sidebar de detalle del producto
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }

    this.productsService.getProduct(id)
    .subscribe({
      next: (data) => {
        // Guardar la información del producto elegido
        this.productChosen = data;

        this.statusDetail = 'success';
      },
      error: (err) => {
        this.statusDetail = 'error';
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos...',
          text: err,
        })
      }
    });
  }

  // Crear un nuevo producto
  createNewProduct() {
    const newProduct: CreateProductDTO = {
      title: 'PC',
      description: 'Pc se gamer de alta gama',
      price: 5000,
      categoryId: 5,
      images: ['https://www.pcware.com.co/wp-content/uploads/2023/10/pc-gamer-completo.jpg']
    }

    this.productsService.create(newProduct)
    .subscribe(data => {
      this.products.unshift(data)
    })
  }

  // Actualizar un producto
  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Macbook Pro'
    }

    const id: string = this.productChosen.id;

    this.productsService.update(id, changes)
    .subscribe(data => {
      // Actualizar el producto en la UI
      const productIndex = this.products.findIndex(item => item.id === id)
      this.products[productIndex] = data;

      this.productChosen.title = data.title;
    })
  }

  // Eliminar un producto
  deleteProduct() {
    const idToDelete = this.productChosen.id;
    this.productsService.delete(idToDelete)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  // Cargar más productos de la API
  @Output() loadMore: EventEmitter<string> = new EventEmitter;

  onLoadMore() {
    this.loadMore.emit();
  }
}
