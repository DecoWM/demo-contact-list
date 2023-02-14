import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { SharedUiEffects } from './+state/shared-ui.effects';
import { SharedUiFacade } from './+state/shared-ui.facade';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedUiService } from './shared-ui.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([SharedUiEffects]),
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [ModalDialogComponent],
  declarations: [ModalDialogComponent],
  providers: [SharedUiFacade, SharedUiService],
})
export class SharedUiModule {}
