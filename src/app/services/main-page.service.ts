import { Injectable } from '@angular/core';
import { serverAddress } from '../../assets/utils/environment';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { PageMetaData } from '../models/pageMetaData';
import { ChromeExtensionsService } from './chrome-extensions.service';
import { mainPage } from '../mock/mainPage';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {

  private readonly eventAddress: string = `${serverAddress}/event`;

  constructor(private http: HttpClient, private chromeExtensionsService: ChromeExtensionsService) {

  }

  getMainPageData(): Promise<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(this.eventAddress, {
      headers,
      responseType: 'text'
    }).toPromise();
    // return Promise.resolve(mainPage);
  }

  getEventsList() {
    return this.getMainPageData()
      .then(htmlPage => {
        return this.getJsonData(htmlPage);
      })
      .then(pageMetaData => ({
        openCampaigns: pageMetaData.mylounge.openCampaigns,
        upcomingCampaigns: pageMetaData.mylounge.upcomingCampaigns,
      }));
  }

  private getJsonData(htmlPage: string): PageMetaData {
    const startPhrase = 'window.__INITIAL_STATE__ = ';
    const endPhrase = '}}}';
    const start = htmlPage.indexOf(startPhrase) + startPhrase.length;
    const stop = htmlPage.indexOf(endPhrase) + endPhrase.length;
    return JSON.parse(htmlPage.substring(start, stop));
  }

}
