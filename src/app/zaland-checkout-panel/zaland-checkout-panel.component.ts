import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-zaland-checkout-panel',
  templateUrl: './zaland-checkout-panel.component.html',
})
export class ZalandCheckoutPanelComponent implements OnInit {

  wachersList: number[] = [1];

  constructor() {
  }

  ngOnInit(): void {
  }

}
