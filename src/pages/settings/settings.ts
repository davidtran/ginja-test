import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'settings.html',
})

/**
 * Class Settings: A page where account settings are.
 * @constructor
 */

export class SettingsPage {

  constructor(public nav: NavController) {

  }

  /**
   * Logout
   */
  logout(): void {
      window.localStorage.removeItem('accessToken');

      this.nav.push(LoginPage);
  }
}
