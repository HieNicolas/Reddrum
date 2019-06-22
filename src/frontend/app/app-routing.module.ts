import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './news/news.component';
import {LoginComponent} from './connexion/login.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Contact', component: ContactComponent},
  { path: 'Blog', component: BlogComponent},
  { path: 'News', component: NewsComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
