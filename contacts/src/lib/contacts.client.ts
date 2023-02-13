import { Injectable, inject } from '@angular/core';
import { switchMap, take, from, throwError, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ContactsEntity } from './+state/contacts.models';
import { firebase } from 'firebaseui-angular';

@Injectable()
export class ContactsClient {
  private readonly afs = inject(AngularFirestore);
  private readonly auth = inject(AngularFireAuth);

  getContacts() {
    return this.auth.user.pipe(take(1), switchMap(user => 
      this.afs.collection<ContactsEntity>('contacts', ref => ref.where('userId', '==', user?.uid))
        .valueChanges({ idField: 'id' }).pipe(take(1))))
  }

  getContact(id: string) {
    return this.afs.doc<ContactsEntity>(`contacts/${id}`)
      .valueChanges({ idField: 'id' }).pipe(
        take(1),
        switchMap(contact => contact ? of(contact) : throwError(() => new Error('Contact not found'))))
  }

  addContact(contact: ContactsEntity) {
    return this.auth.user.pipe(take(1), switchMap(user => {
      if (!user) return throwError(() => new Error('No user'));
      return from(this.afs.collection<ContactsEntity>('contacts').add({
        ...contact,
        userId: user.uid,
        created: firebase.firestore.Timestamp.now(),
        modified: firebase.firestore.Timestamp.now()
      }))
    }))
  }

  editContact(contact: ContactsEntity) {
    return from(this.afs.doc<ContactsEntity>(`contacts/${contact.id}`).update({
      ...contact,
      modified: firebase.firestore.Timestamp.now()
    }))
  }

  deleteContact(id: string) {
    return from(this.afs.doc<ContactsEntity>(`contacts/${id}`).delete())
  }
}
