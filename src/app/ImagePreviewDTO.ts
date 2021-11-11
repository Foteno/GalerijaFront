import { SafeUrl } from '@angular/platform-browser';

export interface ImagePreviewDTO {
    url: SafeUrl,
    name: string,
    description: string,
    uuid: string
}
