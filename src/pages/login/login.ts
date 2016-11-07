import { NavController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Component} from '@angular/core';
import { GinjaHttpClient } from '../../providers/http-client'
import { config } from '../../config/config';

@Component({
    templateUrl: 'login.html',
    selector: 'login',
    providers: [GinjaHttpClient]
})
/**
 * Class LoginPage A login class for login.html.
 * @param string email.
 * @param string password.
 * @constructor
 */
export class LoginPage {
    email;
    password;
    validation;

    constructor(public nav: NavController, public httpClient: GinjaHttpClient, public toast: ToastController) {
        this.nav = nav;
        this.httpClient = httpClient;
    }

    /**
     * Submit vendor authoriztions
     *
     * @param {string} value A form values
     * @param {Event} e A javascript event
     */
    onSubmit(): void {
        let body = JSON.stringify({
            'email': this.email,
            'password': this.password,
            'grant_type': 'password',
            'client_id': 'vendor-console',
            'client_secret': config.clientSecret,
            'scope': 'vendor'
        });
        this.httpClient.login(body)
            .subscribe(
                data => {
                    console.log(data);
                    this.saveResponse(data,this.email)
                },
                err => this.errorToast(),
                () => console.log('Authentication Complete')
            );
    }

    errorToast() {
        let toast = this.toast.create({
            message: 'Invalid Email or Password!',
            duration: 5000,
            cssClass: 'errorToast',
            position: 'top'
        });
        toast.present();
    }

    /**
     * Save user info
     *
     * @param {string} data Response data
     * @param {string} email An email
     */
    saveResponse(data, email): void{
        let body = JSON.parse(data._body);
        window.localStorage.setItem('accessToken', body.access_token);
        window.localStorage.setItem('user', email);
        this.nav.push(HomePage);
    }
}
