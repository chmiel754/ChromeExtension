import { SniperStatus } from '../enum/sniper-status.enum';
import {
  interval,
  Subscription,
} from 'rxjs';

export class Sniper {

  public status: SniperStatus = SniperStatus.STOPPED;

  private subscription: Subscription;

  constructor(private delay: number = 2000,
              private action: () => void) {
  }

  start() {
    this.status = SniperStatus.WORKING;
    this.subscription = interval(this.delay).subscribe(() => this.action());

  }

  stop() {
    this.status = SniperStatus.STOPPED;
    this.subscription.unsubscribe();
  }
}
