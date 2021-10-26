import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { Location } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ImagePreviewDTO } from '../ImagePreviewDTO';
import { merge, Observable } from 'rxjs';
// FIXME nenaudojami importai
// FIXME metodų ir variables pavadinimai labai neaiškūs ir neatspindi kam jie skirti

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  readonly PATH = "http://localhost:8080/image/";
  pageIndex: number = 0;
  pageSize: number = 0;

  // FIXME nenaudojami variables
  string: string = '';
  images: ImagePreviewDTO[] = [];
  displayedColumns: string[] = ['url', 'name', 'description'];
  dataSource = new MatTableDataSource<ImagePreviewDTO>([]);
  thumb: SafeUrl[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  onChangePage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if (event.pageIndex == (event.length/event.pageSize) - 1) {
      this.download(event.pageIndex + 1, event.pageSize);
    }
    console.log(event);
  }

  constructor(
    private galleryService: GalleryService,
    // FIXME nenaudojami dependencies
    private location: Location
    ) { }
  ngAfterViewInit(): void {
    this.download(this.pageIndex, this.paginator.pageSize * 2);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  // FIXME kokia prasmė šito metodo?
  getClicked (image: ImagePreviewDTO): string {
    return image.uuid;
  }

  download(page: number, size: number): void {
    // FIXME kodėl any rezultatas, ką reiškia mess?
    this.galleryService.downloadData(page, size).subscribe((mess: any) => {
      // FIXME kodėl string array jeigu čia nėra string array?
      let string: string[] = mess.content;
      // FIXME o jeigu padarytum this.images = mess.content ar būtų blogai?
      string.forEach((element: any) => {
        this.images.push({ url: this.PATH + element.uuid + "small", name: element.name, description: element.description, uuid: element.uuid});
      });
    })
      // FIXME ką daro .add() ?
      .add(() => {
        this.dataSource.data = this.images;
      });
  }


}
