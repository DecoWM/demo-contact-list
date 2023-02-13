import { createAction, props } from '@ngrx/store';
import { ContactsEntity } from './contacts.models';

export const initContacts = createAction('[Contacts Page] Init');

export const loadContactsSuccess = createAction(
  '[Contacts/API] Load Contacts Success',
  props<{ contacts: ContactsEntity[] }>()
);

export const loadContactsFailure = createAction(
  '[Contacts/API] Load Contacts Failure',
  props<{ error: any }>()
);

export const clearContacts = createAction('[Contacts Page] Clear');

export const loadEditContact = createAction(
  '[Contact Edit Page] Load Edit Contact',
  props<{ id: string }>()
);

export const loadEditContactSuccess = createAction(
  '[Contacts/API] Load Edit Contact Success',
  props<{ contact: ContactsEntity }>()
);

export const loadEditContactFailure = createAction(
  '[Contacts/API] Load Edit Contact Failure',
  props<{ error: any }>()
);

export const clearEditContact = createAction('[Contact Edit Page] Clear Edit Contact');

export const addContact = createAction(
  '[Contacts/API] Add Contact',
  props<ContactsEntity>()
);

export const addContactFailure = createAction(
  '[Contacts/API] Add Contact Failure',
  props<{ error: any }>()
);

export const editContact = createAction(
  '[Contacts/API] Edit Contact',
  props<ContactsEntity>()
);

export const editContactFailure = createAction(
  '[Contacts/API] Edit Contact Failure',
  props<{ error: any }>()
);

export const deleteContact = createAction(
  '[Contacts/API] Delete Contact',
  props<{ id: string }>()
);

export const deleteContactFailure = createAction(
  '[Contacts/API] Delete Contact Failure',
  props<{ error: any }>()
);