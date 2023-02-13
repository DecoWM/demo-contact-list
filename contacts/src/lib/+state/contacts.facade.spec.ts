import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as ContactsActions from './contacts.actions';
import { ContactsEffects } from './contacts.effects';
import { ContactsFacade } from './contacts.facade';
import { ContactsEntity } from './contacts.models';
import {
  CONTACTS_FEATURE_KEY,
  ContactsState,
  initialContactsState,
  contactsReducer,
} from './contacts.reducer';
import * as ContactsSelectors from './contacts.selectors';

interface TestSchema {
  contacts: ContactsState;
}

describe('ContactsFacade', () => {
  let facade: ContactsFacade;
  let store: Store<TestSchema>;
  const createContactsEntity = (id: string, name = ''): ContactsEntity => ({
    id,
    userId: `uid-${id}`,
    name: name || `name-${id}`,
    phone: `phone-${id}`,
    email: `${id.toLowerCase()}@test.com`,
    created: '',
    modified: ''
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CONTACTS_FEATURE_KEY, contactsReducer),
          EffectsModule.forFeature([ContactsEffects]),
        ],
        providers: [ContactsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ContactsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allContacts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allContacts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadContactsSuccess` to manually update list
     */
    it('allContacts$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allContacts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ContactsActions.loadContactsSuccess({
          contacts: [createContactsEntity('AAA'), createContactsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allContacts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
