import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  // Imagen de error 404
  img404: string = './assets/images/404_not_found.jpg'

  constructor() { }

}
