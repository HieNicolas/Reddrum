import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'Contact', component: ContactComponent},
  { path: 'Blog', component: BlogComponent},
  { path: 'News', component: NewsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
