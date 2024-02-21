import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { HighlightDirective } from './directives/highlight.directive';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective
  ]
})
export class SharedModule { }
