import { inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { Observable, of, merge, Subject } from 'rxjs';
import { ContactsFacade } from '../+state/contacts.facade';

// TODO: Replace this with your own data model type
export interface ContactListItem {
  id?: string;
  name: string;
  phone: string;
  email: string;
}

/**
 * Data source for the ContactList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ContactListDataSource extends DataSource<ContactListItem> {
  data: ContactListItem[] = [];
  sort: MatSort | undefined;

  private readonly facade = inject(ContactsFacade);
  private _filter: string = '';
  private filter$: Subject<string> = new Subject()

  set filter(filter: string){
    this._filter = filter;
    this.filter$.next(filter);
  }

  get filter(): string {
    return this._filter;
  }

  get isEmpty(): boolean {
    return this.data.length === 0;
  }

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ContactListItem[]> {
    if (!this.sort) {
      throw Error('Please set the sort on the data source before connecting.');
    }
    this.facade.init();
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return merge(
      this.facade.allContacts$.pipe(tap(list => this.data = list)),
      this.sort.sortChange,
      this.filter$
      )
      .pipe(map(() => this.getSortedData(this.getFilteredData([...this.data ]))));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.facade.clear();
  }

  private getFilteredData(data: ContactListItem[]): ContactListItem[] {
    if(!this.filter || this._filter === ''){
      return data;
    }
    return data.filter(contact => JSON.stringify(contact).includes(this.filter));
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ContactListItem[]): ContactListItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'phone': return compare(a.phone, b.phone, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
