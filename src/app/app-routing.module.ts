import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'order',component:UserOrderComponent},
  {path:'cart',component:CartComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
