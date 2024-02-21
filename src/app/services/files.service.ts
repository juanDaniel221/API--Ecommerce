import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';

import { File } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl = 'https://young-sands-07814.herokuapp.com/api/files/upload';

  // Descargar archivos
  getFile(name: string, url: string, type: string) {
    // Obtener el contenido del archivo
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        // Descargar el archivo
        const blob = new Blob([content], {type});
        saveAs(blob, name);

        // Si todo sale bien, tranformar la petición y mostrar true
        map(() => true)
      })
    )
  }

  // Subir un archivo
  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);

    return this.http.post<File>(this.apiUrl, dto);
  }

}
