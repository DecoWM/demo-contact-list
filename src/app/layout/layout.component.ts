import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'demo-contact-list-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(public auth: AngularFireAuth, private readonly router: Router) {}

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
