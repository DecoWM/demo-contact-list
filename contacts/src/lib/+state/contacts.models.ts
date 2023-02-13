/**
 * Interface for the 'Contacts' data
 */
export interface ContactsEntity {
  id?: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  created: Object;
  modified: Object;
}

export class ContactsEntityUtil {
  static empty(): ContactsEntity {
    return {
      userId: '',
      name: '',
      phone: '',
      email: '',
      created: {},
      modified: {},
    }
  }
}
