import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalData, NotificationData } from './shared-ui.interface';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

const DEFAULT_SNACKBAR_DURATION = 2000;

@Injectable({ providedIn: 'root' })
export class SharedUiService {
  constructor (
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar
  ) {}

  openModal (data: ModalData): void {
    const modalRef = this.dialog.open(ModalDialogComponent, {
      panelClass: ['demo-contact-list-modal-dialog'],
      data,
    });

    if (data.afterClosed) {
      modalRef.afterClosed().subscribe(data.afterClosed);
    }
  }

  openNotification (data: NotificationData) {
    this.snackbar.open(data.message, data.action, { 
      panelClass: [
        `demo-contact-list-notification-${data.notificationType ?? 'neutral'}`,
        'demo-contact-list-notification-snackbar'
      ],
      duration: data.durationMs ?? DEFAULT_SNACKBAR_DURATION,
    })
  }
}
