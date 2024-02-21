import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent {

  img: string = ''

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
  };

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>()
  imageDefault: string = './assets/images/default.jpg';

  constructor() { }

  // ********** Métodos **********
  imgLoad() {
    this.loaded.emit(this.img)
  }

  // Mostrar una imagen por defecto si hay un error al cargar la original
  imgError() {
    this.img = this.imageDefault;
  }

}
