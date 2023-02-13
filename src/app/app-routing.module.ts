import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { LayoutComponent } from './layout/layout.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToMain = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'contacts',
        loadChildren: () => import('@demo-contact-list/contacts').then(m => m.ContactsModule),
      },
      {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full',
      },
    ],
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'login',
    loadChildren: () => import('@demo-contact-list/auth').then(m => m.AuthModule),
    ...canActivate(redirectLoggedInToMain),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}