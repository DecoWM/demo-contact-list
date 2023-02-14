import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SharedUiActions from './shared-ui.actions';
import { ModalData, NotificationData } from '../shared-ui.interface';

@Injectable()
export class SharedUiFacade {
  private readonly store = inject(Store);

  showModal(data: ModalData) {
    this.store.dispatch(SharedUiActions.showModal(data));
  }

  showNotification(data: NotificationData) {
    this.store.dispatch(SharedUiActions.showNotification(data));
  }
}
