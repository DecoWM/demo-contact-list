import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ContactListDataSource, ContactListItem } from './contact-list-datasource';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactsFacade } from '../+state/contacts.facade';
import { SharedUiFacade } from '@demo-contact-list/shared/ui';

@Component({
  selector: 'demo-contact-list-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ContactListItem>;
  dataSource: ContactListDataSource;
  displayedColumns = ['name', 'phone', 'email', 'actions'];
  loaded$ = this.contacts.loaded$;

  constructor(
    private readonly contacts: ContactsFacade,
    private readonly sharedUi: SharedUiFacade,
    private readonly dialog: MatDialog
  ) {
    this.dataSource = new ContactListDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addContact() {
    this.dialog.open(ContactFormComponent);
  }

  editContact(id: string) {
    this.dialog.open(ContactFormComponent, { data: {id} });
  }

  deleteContact(id: string) {
    this.sharedUi.showModal({
      title: 'Delete contact',
      message: 'This action can\'t be undone. Do you want to proceed?',
      dialog: {
        accept: {
          title: 'Yes',
          callback: () => {
            this.contacts.deleteContact(id)
          },
        },
        cancel: {
          title: 'No',
        },
      },
    })
  }
}
