import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as ContactsActions from './contacts.actions';
import * as ContactsFeature from './contacts.reducer';
import * as ContactsSelectors from './contacts.selectors';
import { ContactsEntity } from './contacts.models';

@Injectable()
export class ContactsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ContactsSelectors.selectContactsLoaded));
  allContacts$ = this.store.pipe(select(ContactsSelectors.selectAllContacts));
  selectedContacts$ = this.store.pipe(select(ContactsSelectors.selectEntity));
  edit$ = this.store.pipe(select(ContactsSelectors.selectEdit));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ContactsActions.initContacts());
  }

  clear() {
    this.store.dispatch(ContactsActions.clearContacts());
  }

  loadEditContact(id: string) {
    this.store.dispatch(ContactsActions.loadEditContact({id}));
  }

  clearEditContact(id: string) {
    this.store.dispatch(ContactsActions.clearEditContact());
  }

  addContact(contact: ContactsEntity) {
    this.store.dispatch(ContactsActions.addContact(contact));
  }

  editContact(contact: ContactsEntity) {
    this.store.dispatch(ContactsActions.editContact(contact));
  }

  deleteContact(id: string) {
    this.store.dispatch(ContactsActions.deleteContact({id}));
  }
}
