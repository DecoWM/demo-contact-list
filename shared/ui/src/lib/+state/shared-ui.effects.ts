import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as SharedUiActions from './shared-ui.actions';
import { tap } from 'rxjs';
import { SharedUiService } from '../shared-ui.service';
import { ModalData, NotificationData } from '../shared-ui.interface';

@Injectable()
export class SharedUiEffects {
  private actions$ = inject(Actions);
  private readonly service = inject(SharedUiService);

  showModal$ = createEffect(() => this.actions$.pipe(
    ofType(SharedUiActions.showModal),
    tap((action: ModalData) => {
      this.service.openModal(action);
    }),
  ), { dispatch: false });

  showNotification$ = createEffect(() => this.actions$.pipe(
    ofType(SharedUiActions.showNotification),
    tap((action: NotificationData) => {
      this.service.openNotification(action);
    }),
  ), { dispatch: false });
}
