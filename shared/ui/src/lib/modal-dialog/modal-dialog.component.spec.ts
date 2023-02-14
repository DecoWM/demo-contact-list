import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  MatDialogRef, MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ModalData } from '../shared-ui.interface';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalDialogComponent } from './modal-dialog.component';
import { MatIcon } from '@angular/material/icon';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {};
const imports = [MatDialogModule, MatButtonModule];
const declarations = [ModalDialogComponent, MatIcon];

describe('ModalDialogComponent', () => {
  let component: ModalDialogComponent;
  let fixture: ComponentFixture<ModalDialogComponent>;

  const mockMatDialogRef = {
    close: noop,
  };

  afterEach(() => {
    fixture.destroy();
  });

  describe('Without dialog', () => {
    const mockModalData = {
      title: 'title',
      message: 'message',
    } as ModalData;

    beforeEach(waitForAsync(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      TestBed.configureTestingModule({
        imports,
        declarations,
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: mockModalData,
          }, {
            provide: MatDialogRef,
            useValue: mockMatDialogRef,
          },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ModalDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.title).toEqual(mockModalData.title);
      expect(component.message).toEqual(mockModalData.message);
      expect(component.dialog).toBeNull();
    });

    it('should run accept', () => {
      const spyClodeModal = jest.spyOn(component.modalRef, 'close');
      component.accept();
      expect(spyClodeModal).toHaveBeenCalled();
    });

    it('should run cancel', () => {
      const spyClodeModal = jest.spyOn(component.modalRef, 'close');
      component.cancel();
      expect(spyClodeModal).toHaveBeenCalled();
    });
  });

  describe('With dialog', () => {
    const mockModalData = {
      title: 'title',
      message: 'message',
      dialog: {
        accept: {
          title: 'yes',
          callback: noop,
        },
        cancel: {
          title: 'no',
          callback: noop,
        },
      },
    } as ModalData;

    // eslint-disable-next-line sonarjs/no-identical-functions
    beforeEach(waitForAsync(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      TestBed.configureTestingModule({
        imports,
        declarations,
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: mockModalData,
          }, {
            provide: MatDialogRef,
            useValue: mockMatDialogRef,
          },
        ],
      }).compileComponents();
    }));

    // eslint-disable-next-line sonarjs/no-identical-functions
    beforeEach(() => {
      fixture = TestBed.createComponent(ModalDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component.title).toEqual(mockModalData.title);
      expect(component.message).toEqual(mockModalData.message);
      expect(component.dialog).not.toBeNull();
      expect(component.dialog).toEqual(mockModalData.dialog);
    });

    
    it('should run accept', () => {
      if(!component.dialog || !component.dialog.accept) {
        return;
      }
      const spyCloseModal = jest.spyOn(component.modalRef, 'close');
      const spyAcceptCallback = jest.spyOn(component.dialog.accept, 'callback');
      component.accept();
      expect(spyAcceptCallback).toHaveBeenCalled();
      expect(spyCloseModal).toHaveBeenCalled();
    });

    it('should run cancel', () => {
      if(!component.dialog || !component.dialog.cancel) {
        return;
      }
      const spyCloseModal = jest.spyOn(component.modalRef, 'close');
      const spyCancelCallback = jest.spyOn(component.dialog.cancel, 'callback');
      component.cancel();
      expect(spyCancelCallback).toHaveBeenCalled();
      expect(spyCloseModal).toHaveBeenCalled();
    });
  });
});
