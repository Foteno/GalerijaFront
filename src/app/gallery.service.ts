import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }
  
  upload(file: File, name: string, date: string, description: string, array: Array<string>): Observable<any> {
    const data: FormData = new FormData();
    data.append('image', file, file.name);
    data.append('name', name);
    data.append('date', date);
    data.append('description', description);
    array.forEach((element: string) => {
      data.append('tags', element);
    });
    return this.http.post('http://localhost:8080/image', data);
  }

  downloadData(page: number, size: number): Observable<any> {
    return this.http.get('http://localhost:8080/image', {
      params: {
        page: page,
        size: size
      }
    });
  }

  downloadFullImage(uuid: string): Observable<any> {
    return this.http.get('http://localhost:8080/image/details/' + uuid);
  }

  updateImage(file: File, name: string, date: string, description: string, uuid: string, array: Array<string>): Observable<any> {
    const data: FormData = new FormData();
    data.append('image', file, file.name);
    data.append('name', name);
    data.append('date', date);
    data.append('description', description);
    array.forEach((element: string) => {
      data.append('tags', element);
    });
    
    return this.http.put('http://localhost:8080/image/details/' + uuid, data);
  }
}
