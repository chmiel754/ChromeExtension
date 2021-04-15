import {
  Component,
  OnInit,
} from '@angular/core';
import { ItemRequest } from '../models/itemRequest.model';
import { SniperItemListService } from './sniper-item-list.service';

@Component({
  selector: 'app-repeater',
  templateUrl: './repeater.component.html',
  styles: [],
})
export class RepeaterComponent implements OnInit {

  sniperItemList: ItemRequest[] = [];

  constructor(private sniperItemListService: SniperItemListService) {
  }

  ngOnInit(): void {
    this.sniperItemListService.getItemList()
      .subscribe(list => {
        this.sniperItemList = list;
      });
  }

}
