import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  activeSideMenu: boolean = false;
  // Almacenar las categorias traidas desde la API
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  // Móstrar/ocultar side menu (mobile)
  toggleSideMenu() {
    this.activeSideMenu = !this.activeSideMenu;
  }

  // Obtener las categorias
  getAllCategories() {
    this.categoriesService.getCategories()
    .subscribe(response => this.categories = response);
  }
}
