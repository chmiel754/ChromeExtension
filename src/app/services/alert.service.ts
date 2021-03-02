import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  allAlerts: object[];

  alerts: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([]);

  updateAlerts(alertValue: {}): void {
    this.allAlerts.push(alertValue);
    this.alerts.next(this.allAlerts);
  }

  getAlertsObservable(): Observable<object[]> {
    return this.alerts.asObservable();
  }


}
