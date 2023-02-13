import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FirebaseUIModule } from 'firebaseui-angular';
import { AuthRoutingModule } from './auth-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FirebaseUIModule.forFeature({}),
    MatCardModule,
  ],
  providers: [],
  declarations: [LoginComponent],
})
export class AuthModule {}
