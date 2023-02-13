import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ContactsActions from './contacts.actions';
import { ContactsEntity } from './contacts.models';

export const CONTACTS_FEATURE_KEY = 'contacts';

export interface ContactsState extends EntityState<ContactsEntity> {
  selectedId?: string | number; // which Contacts record has been selected
  loaded: boolean; // has the Contacts list been loaded
  error?: string | null; // last known error (if any)
  edit: {
    contact: ContactsEntity | null
    loaded: boolean
    error?: string | null
  };
}

export interface ContactsPartialState {
  readonly [CONTACTS_FEATURE_KEY]: ContactsState;
}

export const contactsAdapter: EntityAdapter<ContactsEntity> =
  createEntityAdapter<ContactsEntity>();

export const initialContactsState: ContactsState =
  contactsAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    edit: {
      contact: null,
      loaded: false
    }
  });

const reducer = createReducer(
  initialContactsState,
  on(ContactsActions.initContacts, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ContactsActions.loadContactsSuccess, (state, { contacts }) =>
    contactsAdapter.setAll(contacts, { ...state, loaded: true })
  ),
  on(
    ContactsActions.loadContactsFailure,
    ContactsActions.addContactFailure,
    ContactsActions.editContactFailure,
    ContactsActions.deleteContactFailure,
    (state, { error }) => ({
      ...state,
      error,
    }
  )),
  on(ContactsActions.clearContacts, (state) =>
    contactsAdapter.setAll([], { ...state })
  ),
  on(ContactsActions.loadEditContact, (state) => ({
    ...state,
    edit: {
      contact: null,
      loaded: false,
      error: null
    }
  })),
  on(ContactsActions.loadEditContactSuccess, (state, { contact }) => ({
    ...state,
    edit: {
      ...state.edit,
      loaded: true,
      contact
    }
  })),
  on(ContactsActions.loadEditContactFailure, (state, { error }) => ({
      ...state,
      edit: {
        ...state.edit,
        error
      }
    }
  )),
  on(ContactsActions.clearEditContact, (state) => ({
    ...state,
    edit: {
      ...state.edit,
      contact: null
    }
  })),
);

export function contactsReducer(
  state: ContactsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
