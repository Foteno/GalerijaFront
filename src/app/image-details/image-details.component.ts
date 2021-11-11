import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { GalleryService } from '../gallery.service';
import { ImageDetailDTO } from '../ImageDetailDTO';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  fileChosen: Boolean = false;
  file: File = new File([''], '');
  isEditing: Boolean = false;
  url: string = '';
  uuid?: string;
  date?: string;
  image: ImageDetailDTO = {name: 'error: no image loaded', date: '', description: 'error', uuid: '', tags: [{name: ''}]};
  imageStatic: ImageDetailDTO = {name: 'error: no image loaded', date: '', description: 'error', uuid: '', tags: [{name: ''}]};

  constructor(
    private galleryService: GalleryService,
    private route: ActivatedRoute,
    public tokenStorageService: TokenStorageService
  ) { }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.image.name = this.imageStatic.name;
    this.image.description = this.imageStatic.description;
    this.image.date = this.imageStatic.date;
    this.image.uuid = this.imageStatic.uuid;

    this.image.tags = [{name: ''}];
    this.setImageTagsAndResetDate(this.image, this.imageStatic);//set tags and date value from image to imageStatic(tags not edited)
  }

  private setImageTagsAndResetDate(imageFrom: ImageDetailDTO, imageTo: ImageDetailDTO) {
    imageFrom.tags.pop();
    imageTo.tags.forEach((element: { name: string }) => {
      let name = element.name;
      imageFrom.tags.push({name});
    });

    this.date = (new Date(imageFrom.date).toISOString().substring(0, 19));
  }

  saveEditedImage(): void {
    let array = new Array<string>();
    this.image.tags.forEach((element: {name: string}) => {
      array.push(element.name);
    });
    console.log(array);
    if (array[0] == null) {
      array.push('');
    }
    console.log(array);
    this.galleryService.updateImage(this.file, this.image.name, this.image.date,
      this.image.description, this.image.uuid, array).subscribe();
  }

  onFileChoice(event: any): void {
    console.log(event);
    this.fileChosen = true;
    this.file = event.target.files[0];
    console.log(this.file);
    this.imageStatic.name = this.file.name;
    this.image.name = this.imageStatic.name;
    this.imageStatic.date = (new Date(this.file.lastModified)).toLocaleDateString('lt-LT', {year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute:'numeric', second:'numeric'});
    this.image.date = this.imageStatic.date;
    this.date = (new Date(this.image.date).toISOString().substring(0, 19));
  }

  deleteTag(tag: any): void {
    console.log(this.image.tags);
    this.image.tags.splice(this.image.tags.indexOf(tag), 1);
    console.log(this.image.tags);
  }

  addTag(): void {
    this.image.tags.push({name: ''});
  }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid')!;
    this.url = 'http://localhost:8080/image/' + this.uuid;

    if (this.uuid != '') {
      this.galleryService.downloadFullImage(this.uuid!).subscribe((message: ImageDetailDTO) => {
        this.image = message;
        this.imageStatic.name = this.image.name;
        this.imageStatic.description = this.image.description;
        this.imageStatic.date = this.image.date;
        this.imageStatic.uuid = this.image.uuid;

        this.setImageTagsAndResetDate(this.imageStatic, this.image);//set tags and date value from imageStatic to image(tags to edit)
      });
    }
  }

}
