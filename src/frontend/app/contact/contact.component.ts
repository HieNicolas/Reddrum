import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup} from '@angular/forms';
import {SubscriptionsService} from '../services/subscriptions.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionsService
  ) {
    this.formGroup = this.formBuilder.group({
      mail: this.formBuilder.control(''),
      isAccepted: this.formBuilder.control(false)
    });
  }

  ngOnInit() {
  }

  public subscribe() {
    const mail = this.formGroup.controls['mail'].value;
    const isAccepted = this.formGroup.controls['isAccepted'].value;

    if (isAccepted) {
      this.subscriptionService.addMail(mail)
        .then((message) => {console.log(message); alert(message); }, (err) => {console.log(err); alert(err); });
    }
  }
}
