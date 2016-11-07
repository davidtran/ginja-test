import { Component, ViewChild, ErrorHandler } from '@angular/core';
import { Platform, MenuController, Nav, App } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements ErrorHandler {
    @ViewChild(Nav) nav: Nav;
    pages: Array<PageObj>;
    rootPage: any;

    constructor(public platform: Platform, public menu: MenuController, public app: App) {
        this.initializeApp();


        let homePage : PageObj = {title: 'Active Order', component:HomePage};
        let settingsPage: PageObj = {title: 'Settings', component:SettingsPage};

        // set app's pages
        this.pages = [
            homePage,
            settingsPage
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.checkPreviousAuthorization();
        });
    }

    checkPreviousAuthorization(): void {
        if(window.localStorage.getItem('accessToken') === "undefined" || window.localStorage.getItem('accessToken') === null) {
            this.rootPage = LoginPage;
        } else {
            this.rootPage = HomePage;
        }
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }

    handleError(exception: any) {
        if (exception === 'access_denied'){
            window.localStorage.removeItem('accessToken');
            this.app.getRootNav().setRoot(LoginPage);
        }
    }
}

export interface PageObj {
      title: string;
      component: any;
}
