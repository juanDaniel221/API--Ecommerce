import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imgUrl: string = '';
  showImage: boolean = true;
  // Imagen subida
  imgUploaded: string = '';

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fileService: FilesService
  ) {}

  // Métodos
  onLoaded(img: string) {
    console.log(`Log padre ${img}`);
  }

  toogleImage() {
    this.showImage = !this.showImage;
  }

  // Crear un usuario
  createUser() {
    this.userService.create({
      name: 'Juan',
      email: 'juan@example.com',
      password: 'angularplatzi'
    })
    .subscribe(data => console.log(data));
  }

  // Autenticar usuario
  login() {
    this.authService.login('juan@example.com', 'angularplatzi')
    .subscribe(response => {
      // Guardar del token de acceso del usuario
      console.log(response);
    });
  }

  // Obtener el perfil de un usuario logueado
  getProfile() {
    this.authService.profile()
    .subscribe(profile => console.log(profile))
  }

  // Descargar un archivo PDF
  downloadPDF() {
    this.fileService.getFile('file.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  // Subir archivo
  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    // Seleccionar el archivo subido
    const file = element.files?.item(0)

    if (file) {
      this.fileService.uploadFile(file)
      .subscribe(response => {
        this.imgUploaded = response.location;
      })
    }
  }
}
