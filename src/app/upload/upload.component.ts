import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  file: File = new File([""], "");
  name: string = "";
  date: string = "";
  description: string = "";
  array: Array<{name: ""}> = new Array<{name: ""}>();//original way of doing ngmodel twoway binding
  constructor(
    private galleryService: GalleryService
  ) { }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.name = this.file.name;
    this.date = (new Date(this.file.lastModified)).toLocaleDateString('lt-LT', {year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute:'numeric', second:'numeric'});
  }

  addTag(): void {
    this.array.push({name: ""});
  }

  onUpload() {
    if (this.file.name != "") {
      let tagNames = new Array<string>();
      this.array.forEach((element: {name: string}) => {
        tagNames.push(element.name);
      });
      this.galleryService.upload(this.file, this.name, this.date, this.description, tagNames).subscribe();
    }
  }

  ngOnInit(): void {
    this.array.push({name: ""});
  }

}
