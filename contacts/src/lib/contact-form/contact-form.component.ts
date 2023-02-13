import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactsFacade } from '../+state/contacts.facade';
import { ContactsEntityUtil } from '../+state/contacts.models';

@Component({
  selector: 'demo-contact-list-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  edit$ = this.facade.edit$;
  contact = ContactsEntityUtil.empty();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id?: string },
    private readonly facade: ContactsFacade
  ) {
    this.data = this.data ?? { id: null }
  }

  ngOnInit(): void {
    if(this.data.id) {
      this.facade.loadEditContact(this.data.id)

      const sub = this.edit$.subscribe(edit => {
        if(edit.loaded && edit.contact) {
          this.contact = { ...edit.contact }
          this.contactForm.setValue({
            name: edit.contact.name,
            phone: edit.contact.phone,
            email: edit.contact.email
          })
          this.contactForm.updateValueAndValidity()
          sub.unsubscribe()
        }
      })
    }
  }

  save(): void {
    if(!this.contactForm.valid) return;
    this.facade.addContact({
      ...this.contact,
      ...Object.fromEntries(
        Object.entries(this.contactForm.value).filter(entry => entry[1])
      )
    });
    this.close();
  }

  update(): void {
    if(!this.data.id || !this.contactForm.valid) return;
    this.facade.editContact({
      ...this.contact,
      ...Object.fromEntries(
        Object.entries(this.contactForm.value).filter(entry => entry[1])
      )
    });
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
