import { Injectable } from '@angular/core';

declare const chrome;

@Injectable({
  providedIn: 'root',
})
export class ChromeExtensionsService {

  constructor() {
  }

  log(value: string, extraItem: any = '') {
    chrome.extension.getBackgroundPage().console.log(value, extraItem);
    // console.log(value, extraItem);
  }
}
