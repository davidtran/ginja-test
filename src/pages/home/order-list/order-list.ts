import { NavController, AlertController, LoadingController, Platform, Content, InfiniteScrollContent } from 'ionic-angular';
import { Component, Input, Output } from '@angular/core';
import { GinjaHttpClient } from '../../../providers/http-client';
import { OrderItem } from '../order-item/order-item';
import { LoginPage } from '../../login/login';

@Component({
  templateUrl: 'order-list.html',
  selector: 'order-list'
})
export class OrderList {

  orders: any[] = [];
  page: number = 1;
  orderType: string = 'current';

  constructor(public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public platform: Platform,
              public httpClient: GinjaHttpClient,
              public nav: NavController) {

    this.platform.ready().then(() => {
      this.fetchOrders('current', 1, null);
    });
  }

  /**
   * Get order list title
   *
   * @returns
   *
   * @memberOf OrderList
   */
  getOrderListTitle() {
    if (this.orderType === 'current') {
      return 'NEW ORDERS';
    } else {
      return 'COMPLETED ORDERS';
    }
  }

  /**
   * Fetch orders for order listview
   *
   * @param {number} page Order pagination
   */
  fetchOrders(type, page: number, refresher: any, concatNewItems = false): void {
    this.page = page;
    this.orderType = type;
    let loader = this.loadingCtrl.create({
      content: "Loading Orders",
      duration: 30000  // set very high as v2 call seems to take a long time
    });

    this.httpClient.fetchOrders(page, "current")
      .subscribe(
      data => {
        console.log('orders', data);
        if (concatNewItems) {
          this.orders = this.orders.concat(data);
        } else {
          this.orders = data;
        }
      },
      err => {
        this.handleRequestError(err);
      },
      () => {
        // finally
        if (refresher) {
          refresher.complete();
        }
      }
      );
  }

  /**
   * Handle request error
   *
   * @param {any} err
   *
   * @memberOf OrderList
   */
  handleRequestError(err) {
    if (err._body === 'invalid.token') {
      window.localStorage.removeItem('accessToken');
      let alert = this.alertCtrl.create({
        title: 'Login reqire',
        message: 'Session expired. Please login again',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.nav.push(LoginPage);
            }
          }
        ]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: "Error",
        message: "Can not fetch orders"
      });
      alert.present();
    }
  }

  loadMore(infiniteScroll) {
    console.log('aaa');
    this.page++;
    this.fetchOrders(this.orderType, this.page, infiniteScroll, true);
  }
}