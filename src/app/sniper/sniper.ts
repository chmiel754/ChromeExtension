import { SniperStatus } from '../enum/sniper-status.enum';
import {
  interval,
  Subscription,
} from 'rxjs';

export class Sniper {

  public status: SniperStatus = SniperStatus.STOPPED;

  private subscription: Subscription;

  interval: number = 1000;

  constructor(private delay: number = 2000,
              private action: () => void) {
    this.interval = delay;
  }

  start() {
    if (this.status !== SniperStatus.WORKING) {
      this.subscription = interval(this.interval).subscribe(() => this.action());
      this.status = SniperStatus.WORKING;
    }
  }

  stop() {
    this.status = SniperStatus.STOPPED;
    this.subscription?.unsubscribe();
  }

}
