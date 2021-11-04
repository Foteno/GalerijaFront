import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  file: File = new File([""], "");
  isEditing: Boolean = false;
  url: string = "";
  uuid?: string;
  date?: string;
  image: ImageDetailDTO = {name: "error: no image loaded", date: "", description: "error", uuid: "", tags: [{name: ""}]};
  imageStatic: ImageDetailDTO = {name: "error: no image loaded", date: "", description: "error", uuid: "", tags: [{name: ""}]};

  constructor(
    private galleryService: GalleryService,
    private router: Router,
    public tokenStorageService: TokenStorageService
  ) { }

  onClick(): void {
    this.isEditing = !this.isEditing;
    this.image.name = this.imageStatic.name;
    this.image.description = this.imageStatic.description;
    this.image.date = this.imageStatic.date;
    this.image.uuid = this.imageStatic.uuid;

    this.image.tags = [{name: ""}];
    this.image.tags.pop();//ismetam tuscia po sukurimo, nes reikalauja kazkodel konstruktorius
    this.imageStatic.tags.forEach((element: {name: string}) => {
      let name = element.name;
      this.image.tags.push({name});
    });

    this.date = (new Date(this.image.date).toISOString().substring(0, 19));
  }

  doUpdate(): void {//TODO: padaryt kad paspaudus, sena issaugota info busena pakeistu nauja
    let array = new Array<string>();
    this.image.tags.forEach((element: {name: string}) => {
      array.push(element.name);
    });
    this.galleryService.updateImage(this.file, this.image.name, this.image.date,
      this.image.description, this.image.uuid, array).subscribe(mess => {
        console.log(mess);
    });
  }

  onChange(event: any): void {
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

  deleteTag(object: any): void {
    this.image.tags.splice(this.image.tags.indexOf(object), 1);
  }

  addTag(): void {
    this.image.tags.push({name: ""});
  }

  ngOnInit(): void {
    this.uuid = this.router.url.split('/')[2];
    this.url = "http://localhost:8080/image/" + this.uuid;

    if (this.uuid != "") {
      this.galleryService.downloadFullImage(this.uuid!).subscribe((message: ImageDetailDTO) => {
        this.image = message;
        this.imageStatic.name = this.image.name;
        this.imageStatic.description = this.image.description;
        this.imageStatic.date = this.image.date;
        this.imageStatic.uuid = this.image.uuid;

        this.imageStatic.tags.pop();//ismetam tuscia po sukurimo, nes reikalauja kazkodel konstruktorius (nes sugalvojau nenaudot array...)
        this.image.tags.forEach((element: {name: string}) => {
          let name = element.name;
          this.imageStatic.tags.push({name});
        });

        this.date = (new Date(this.image.date).toISOString().substring(0, 19));
      });
    }
  }

}
