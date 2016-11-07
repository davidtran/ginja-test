import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Component, Input } from '@angular/core';


@Component({
  templateUrl: 'order-item.html',
  selector: 'order-item'
})
export class OrderItem {
  @Input() order: any;
}