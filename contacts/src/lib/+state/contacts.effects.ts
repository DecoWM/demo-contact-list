import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as ContactsActions from './contacts.actions';
import { switchMap, catchError, of, map, tap } from 'rxjs';
import { ContactsClient } from '../contacts.client';
import { SharedUiFacade } from '@demo-contact-list/shared/ui';

@Injectable()
export class ContactsEffects {
  private readonly actions$ = inject(Actions);
  private readonly client = inject(ContactsClient);
  private readonly sharedUi = inject(SharedUiFacade);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.initContacts),
      switchMap(() => this.client.getContacts()
        .pipe(map(data => ContactsActions.loadContactsSuccess({ contacts: data })))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ContactsActions.loadContactsFailure({ error }));
      })
    )
  );

  loadEditContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.loadEditContact),
      switchMap(({id}) => this.client.getContact(id)
        .pipe(map(data => ContactsActions.loadEditContactSuccess({ contact: data })))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ContactsActions.loadEditContactFailure({ error }));
      })
    )
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.addContact),
      switchMap((contact) => 
        this.client.addContact(contact).pipe(
          tap(() => this.sharedUi.showNotification({ message: 'Contact added succesfully!', action: 'OK' })),
          map(() => ContactsActions.initContacts()))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ContactsActions.addContactFailure({ error }));
      })
    )
  );

  editContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.editContact),
      switchMap((contact) => 
        this.client.editContact(contact).pipe(
          tap(() => this.sharedUi.showNotification({ message: 'Contact updated succesfully!', action: 'OK' })),
          map(() => ContactsActions.initContacts()))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ContactsActions.editContactFailure({ error }));
      })
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactsActions.deleteContact),
      switchMap(({id}) => 
        this.client.deleteContact(id).pipe(
          tap(() => this.sharedUi.showNotification({ message: 'Contact deleted succesfully!', action: 'OK' })),
          map(() => ContactsActions.initContacts()))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ContactsActions.deleteContactFailure({ error }));
      })
    )
  );
}
