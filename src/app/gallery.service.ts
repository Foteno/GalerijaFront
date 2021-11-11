import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageDetailDTO } from './ImageDetailDTO';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }
  private createFormData(file: File, name: string, date: string, description: string, array: Array<string>) {
    const data: FormData = new FormData();
    data.append('image', file, file.name);
    data.append('name', name);
    data.append('date', date);
    data.append('description', description);
    array.forEach((element: string) => {
      data.append('tags', element);
    });
    return data;
  }

  upload(file: File, name: string, date: string, description: string, array: Array<string>): Observable<FormData> {
    const data = this.createFormData(file, name, date, description, array);
    return this.http.post<FormData>('http://localhost:8080/image', data);
  }


  downloadData(page: number, size: number, name: string, isTag: boolean): Observable<Object> {
    if (isTag) {
      return this.http.get('http://localhost:8080/image', {
      params: {
        page: page,
        size: size,
        tag: name
        }
      });
    } else {
      return this.http.get('http://localhost:8080/image', {
      params: {
        page: page,
        size: size,
        name: name
        }
      });
    }

  }

  downloadFullImage(uuid: string): Observable<ImageDetailDTO> {
    return this.http.get<ImageDetailDTO>('http://localhost:8080/image/details/' + uuid);
  }

  updateImage(file: File, name: string, date: string, description: string, uuid: string, array: Array<string>): Observable<FormData> {
    const data = this.createFormData(file, name, date, description, array);
    return this.http.put<FormData>('http://localhost:8080/image/details/' + uuid, data);
  }
}
