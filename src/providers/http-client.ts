import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { config } from '../config/config';
import { Observable } from 'rxjs/Observable';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
/**
 * Class GinjaHttpClient A http client class for ginja ai calls.
 * @constructor
 */
export class GinjaHttpClient {

    constructor(public http: Http) {
        this.http = http;
    }

    getHeaders() {
      let headers = new Headers();
      let accessToken = this.getAccessToken();
      if (accessToken) {
        headers.append('Authorization', 'Bearer ' + accessToken);
      }
      headers.append('Content-Type', 'application/json');
      return headers;
    }

    getAccessToken() {
      let accessToken = window.localStorage.getItem('accessToken');
      return accessToken;
    }

    login(data): Observable<Response> {
      let url: string = config.apiEndPoint + '/api/v1/oauth/access_token';

      return this
        .http
        .post(url, data, {
          headers: this.getHeaders()
        });
    }

    fetchOrders(page, type): Observable<any> {
      let url: string = config.apiEndPoint + '/api/v1/vendor/orders/' + type;
      return this
        .http
        .get(url, {
          headers: this.getHeaders()
        })
        .map(response => {
          let orders = response.json();
          return orders;
        })
        .catch(err => {
          return Observable.throw(err);
        })
    }

    vendorDetails(): Observable<Response> {
      let url: string = config.apiEndPoint + '/api/v2/vendor';
      return this
        .http
        .get(url, {
          headers: this.getHeaders()
        })
    }
}
