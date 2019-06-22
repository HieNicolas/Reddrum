import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup} from '@angular/forms';
import {SubscriptionsService} from '../services/subscriptions.service';
import {IdentificationService} from '../services/identification.service';


@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private identificationService: IdentificationService,
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionsService
  ) {
    this.formGroup = this.formBuilder.group({
      mail: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    });
  }

  ngOnInit() {
  }

  public register() {
    const mail = this.formGroup.controls['mail'].value;
    const pass = this.formGroup.controls['password'].value;
    this.identificationService.register({
      mail: mail,
      password: pass
    }).then(() => {
      alert('Inscription reussie');
    }).catch((err) => {
      alert(err);
    });
  }
}
