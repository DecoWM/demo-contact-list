import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromContacts from './+state/contacts.reducer';
import { ContactsEffects } from './+state/contacts.effects';
import { ContactsFacade } from './+state/contacts.facade';
import { ContactsClient } from './contacts.client';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromContacts.CONTACTS_FEATURE_KEY,
      fromContacts.contactsReducer
    ),
    EffectsModule.forFeature([ContactsEffects]),
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [ContactsFacade, ContactsClient],
  declarations: [ContactListComponent, ContactFormComponent],
})
export class ContactsModule {}
