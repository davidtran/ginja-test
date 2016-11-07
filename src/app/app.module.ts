import { NgModule, ErrorHandler} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { OrderItem } from '../pages/home/order-item/order-item';
import { OrderList } from '../pages/home/order-list/order-list';
import { FormsModule } from '@angular/forms';
import { MomentPipe } from '../pipes/momentPipe';
import { StatusPipe } from '../pipes/statusPipe';
import { CurrencyTHB } from '../pipes/thb-pipe';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SettingsPage,
    OrderItem,
    OrderList,
    MomentPipe,
    StatusPipe,
    CurrencyTHB
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
        mode:"ios"
    }),
    FormsModule,
    CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: MyApp}, Storage]
})
export class AppModule {}
