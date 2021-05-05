import { Injectable } from '@angular/core';

declare const chrome;

@Injectable({
  providedIn: 'root',
})
export class ChromeExtensionsService {

  constructor() {
  }

  openNewTab(url: string) {
    // tslint:disable-next-line:only-arrow-functions
    chrome.tabs.create({url}, function(tab) {
      // Tab opened.
    });
  }

  log(value: string, extraItem: any = '') {
    // chrome.extension.getBackgroundPage().console.log(value, extraItem);
    console.log(value, extraItem);
  }

  copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
