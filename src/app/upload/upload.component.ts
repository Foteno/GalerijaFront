import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  file!: File;
  // FIXME viengubos kabutės turi būti
  name: string = "";
  date: string = "";
  description: string = "";
  constructor(
    private galleryService: GalleryService
  ) { }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.name = this.file.name;
    // FIXME Siulau į ISO stringą pavertinėti
    this.date = (new Date(this.file.lastModified)).toLocaleDateString('lt-LT', {year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute:'numeric', second:'numeric'});
  }
  onUpload() {
    if (this.file.name == "") {
      // FIXME nieko nedaro šita dalis apaart console logginimo
      //add popup, alerting about no file chosen
      console.log(this.file);
    } else {
      // FIXME vietoj visų laukų perdavimo per parametrus gal geriau turėti modelio objektą?
      this.galleryService.upload(this.file, this.name, this.date, this.description).subscribe();
    }
  }

  ngOnInit(): void {
    // FIXME Galima iš kart deklaracijoje šitą daryti
    this.file = new File([""], "");
  }

}
