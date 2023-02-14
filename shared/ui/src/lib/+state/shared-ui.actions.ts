import { createAction, props } from '@ngrx/store';
import { ModalData, NotificationData } from '../shared-ui.interface';

export const showModal = createAction('[Shared:UI] show modal', props<ModalData>());
export const showNotification = createAction('[Shared:UI] show notification', props<NotificationData>());