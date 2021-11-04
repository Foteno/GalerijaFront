import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ImagePreviewDTO } from '../ImagePreviewDTO';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  readonly PATH = "http://localhost:8080/image/";
  pageIndex: number = 0;
  pageSize: number = 0;

  searchStringNameDescription: string = "";
  tempStringNameDescription: string = "";

  searchStringTag: string = "";
  tempStringTag: string = "";

  images: ImagePreviewDTO[] = [];
  displayedColumns: string[] = ['url', 'name', 'description'];
  dataSource = new MatTableDataSource<ImagePreviewDTO>([]);

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  onChangePage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if (event.pageIndex == (event.length/event.pageSize) - 1) {
      this.download(event.pageIndex + 1, event.pageSize, this.searchStringNameDescription, false);
    }
  }

  constructor(private galleryService: GalleryService, public tokenStorageService: TokenStorageService) { }
  ngAfterViewInit(): void {
    this.download(this.pageIndex, this.paginator.pageSize * 2, this.searchStringNameDescription, false);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getClicked (image: ImagePreviewDTO): string {
    return image.uuid;
  }

  loadByNameDescription(): void {
    this.searchStringNameDescription = this.tempStringNameDescription;
    this.images = [];
    this.paginator.pageIndex = 0;
    this.pageIndex = 0;
    this.download(this.pageIndex, this.paginator.pageSize * 2, this.searchStringNameDescription, false);
  }

  loadByTag(): void {
    this.searchStringTag = this.tempStringTag;
    this.images = [];
    this.paginator.pageIndex = 0;
    this.pageIndex = 0;
    this.download(this.pageIndex, this.paginator.pageSize * 2, this.searchStringTag, true);
  }


  download(page: number, size: number, name: string, isTag: boolean): void {
    this.galleryService.downloadData(page, size, name, isTag).subscribe((mess: any) => {
      let string: string[] = mess.content;
      string.forEach((element: any) => {
        this.images.push({ url: this.PATH + element.uuid + "small", name: element.name, description: element.description, uuid: element.uuid});
      });
    }).add(() => {
        this.dataSource.data = this.images;
      });
  }


}