import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ImagePreviewDTO } from './ImagePreviewDTO';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  // FXME kodėl return type Observable<any> ? Turi būti konkretus observable type
  upload(file: File, name: string, date: string, description: string): Observable<any> {
    let array = new Array();
    // FIXME kodėl čia hardcodintos reikšmės?
    array.push("Cats");
    array.push("Dogs");
    const data: FormData = new FormData();
    data.append('image', file, file.name);
    data.append('name', name);
    data.append('date', date);
    data.append('description', description);
    array.forEach(element => {
      data.append('tags', element);
    });
    return this.http.post('http://localhost:8080/image', data);
  }

  // FXME kodėl return type Observable<any> ?
  downloadData(page: number, size: number): Observable<any> {
    return this.http.get('http://localhost:8080/image', {
      params: {
        page: page,
        size: size
      }
    });
  }

  // FXME kodėl return type Observable<any> ?
  downloadFullImage(uuid: string): Observable<any> {
    return this.http.get('http://localhost:8080/image/details/' + uuid);
  }

  // FXME kodėl return type Observable<any> ?, nenaudojamas metodas
  updateImage(uuid: string): Observable<any> {
    const data: FormData = new FormData();

    return this.http.put('http://localhost:8080/image', (body: string) => {});
  }

  // FIXME Kodėl konstruktorius apačioje? Kokia tvarka dėstome konstruktorius Javo'je?
  constructor(private http: HttpClient) { }
}
