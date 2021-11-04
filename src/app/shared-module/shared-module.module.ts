import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurePipe } from '../_services/SecurePipe';



@NgModule({
  declarations: [
    SecurePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SecurePipe
  ]
})
export class SharedModuleModule { }
