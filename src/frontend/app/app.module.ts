import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { NavComponent } from './nav/nav.component';
import { NewsComponent } from './news/news.component';
import {SubscriptionsService} from './services/subscriptions.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './connexion/login.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    BlogComponent,
    NavComponent,
    NewsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [SubscriptionsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
