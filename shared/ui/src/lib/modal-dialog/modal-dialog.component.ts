import {
  ChangeDetectionStrategy,
  Component, Inject,
} from '@angular/core';
import {
  MatDialogRef, MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  ModalData, ModalDialogSettings,
} from '../shared-ui.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {};

@Component({
  selector: 'demo-contact-list-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDialogComponent {
  readonly dialogDefault = {
    accept: {
      title: 'Accept',
      callback: noop,
    },
    cancel: {
      title: 'Cancel',
      callback: noop,
    },
  } as ModalDialogSettings;

  readonly title = this.data.title;
  readonly message = this.data.message;
  readonly dialog = this.data.dialog ? {
    accept: this.data.dialog.accept ? {
      ...this.dialogDefault.accept,
      ...this.data.dialog.accept,
    } : this.dialogDefault.accept,
    cancel: this.data.dialog.cancel ? {
      ...this.dialogDefault.cancel,
      ...this.data.dialog.cancel,
    } : this.dialogDefault.cancel,
  } : null;

  constructor (
    @Inject(MAT_DIALOG_DATA) private readonly data: ModalData,
    readonly modalRef: MatDialogRef<ModalDialogComponent>,
  ) {}

  accept (): void {
    if (this.dialog && this.dialog.accept && this.dialog.accept.callback) {
      this.dialog.accept.callback();
    }
    this.modalRef.close();
  }

  cancel (): void {
    if (this.dialog && this.dialog.cancel && this.dialog.cancel.callback) {
      this.dialog.cancel.callback();
    }
    this.modalRef.close();
  }
}
