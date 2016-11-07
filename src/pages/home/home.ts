declare var Pusher: any;
import { Component, ViewChild } from '@angular/core';
import {
  Platform, Events, NavController, ActionSheetController, ModalController, AlertController, LoadingController, Content, InfiniteScrollContent
} from 'ionic-angular';
import { GinjaHttpClient } from '../../providers/http-client';
import { config } from '../../config/config';
import moment from 'moment';
import { OrderList } from './order-list/order-list';
@Component({
  templateUrl: 'home.html',
  selector: 'home',
  providers: [GinjaHttpClient]
})
/**
 * Class HomePage A homepage class for home.html.
 * @param {Array<any>} list A list of orders.
 * @constructor
 */
 export class HomePage {

   public image_logo: string = "assets/img/Ginja_logowhite.png";
   public image_chatbubble: string = "assets/img/chatbubble.png";
   public image_hamburger: string = "assets/img/hamburger.png";

   public orders;
   public segment: string = "current";

   @ViewChild(OrderList) orderList: OrderList;

   constructor(
     public platform: Platform,
     public events: Events,
     public nav: NavController,
     public httpClient: GinjaHttpClient,
     public actionSheetCtrl: ActionSheetController,
     public modalCtrl: ModalController,
     public loadingCtrl: LoadingController,
     public alertCtrl: AlertController)
   {

   }

   onOrderTypeChange() {
     this.fetchOrders();
   }

   fetchOrders(type: string = 'current') {
     this.orderList.fetchOrders(type, 0, null);
   }
}
