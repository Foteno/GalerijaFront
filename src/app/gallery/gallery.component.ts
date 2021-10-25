import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { Location } from '@angular/common'; 
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ImagePreviewDTO } from '../ImagePreviewDTO';
import { merge, Observable } from 'rxjs';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  readonly PATH = "http://localhost:8080/image/";
  pageIndex: number = 0;
  pageSize: number = 0;

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
    private location: Location
    ) { }
  ngAfterViewInit(): void {
    this.download(this.pageIndex, this.paginator.pageSize * 2);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getClicked (image: ImagePreviewDTO): string {
    return image.uuid;
  }


  download(page: number, size: number): void {
    this.galleryService.downloadData(page, size).subscribe((mess: any) => {
      let string: string[] = mess.content;
      string.forEach((element: any) => {
        this.images.push({ url: this.PATH + element.uuid + "small", name: element.name, description: element.description, uuid: element.uuid});
      });
    })
      .add(() => {
        this.dataSource.data = this.images;
      });
  }


}