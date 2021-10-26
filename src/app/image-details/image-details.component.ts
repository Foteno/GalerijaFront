import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from '../gallery.service';
import { ImagePreviewDTO } from '../ImagePreviewDTO';
import { ImageDetailDTO } from '../ImageDetailDTO';
// FIXME nenaudojami importai

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {

  isEditing: Boolean = true;
  // FIXME viengubos kabutės čia ir visur kitur
  url: string = "";
  uuid?: string;
  date?: string;
  image: ImageDetailDTO = {name: "error: no image loaded", date: "", description: "error", uuid: "", tags: [{name: ""}]};
  constructor(
    private galleryService: GalleryService,
    private router: Router
  ) { }

  // FIXME metodo pavadinimas onClick visiškai nepasako kam tas metodas skirtas ir kam jį naudot. Jeigu būtų pvz. toggleEdit(), būtų daug aiškiau.
  onClick(): void {
    this.isEditing = !this.isEditing;
  }

  onShow(): void {
    console.log(this.image);
  }

  ngOnInit(): void {
    // FIXME yra būdų kaip gauti paduodamą url parametrą neparsinant tiesiogiai url. Reiktų perdaryt
    this.uuid = this.router.url.split('/')[2];
    this.url = "http://localhost:8080/image/" + this.uuid;

    if (this.uuid != "") {
      this.galleryService.downloadFullImage(this.uuid!).subscribe((message: ImageDetailDTO) => {
        this.image = message;

        this.date = (new Date(this.image.date).toISOString().substring(0, 19));
      });
    }
  }

}
