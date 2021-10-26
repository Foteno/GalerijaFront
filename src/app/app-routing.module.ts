import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  // FIXME Reikėtų moduliarizuoti aplikaciją. Turi būti bent vienas ar keli lazy loadinami moduliai (https://angular.io/guide/lazy-loading-ngmodules)
  // FIXME kam reikalingas pathMatch: 'full' ?
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'image/:uuid', component:  ImageDetailsComponent},
  { path: 'gallery', component: GalleryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
