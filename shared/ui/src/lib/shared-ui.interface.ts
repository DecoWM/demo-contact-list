export interface ModalDialogAction {
  title?: string;
  callback?: () => void;
}

export interface ModalDialogSettings {
  accept?: ModalDialogAction;
  cancel?: ModalDialogAction;
}

export interface ModalData {
  title: string;
  message: string;
  afterClosed?: () => void;
  dialog?: ModalDialogSettings;
}

export enum NotificationTypeEnum {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

export interface NotificationData {
  notificationType?: NotificationTypeEnum;
  message: string;
  action?: string;
  durationMs?: number;
}