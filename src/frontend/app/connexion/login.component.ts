import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup} from '@angular/forms';
import {SubscriptionsService} from '../services/subscriptions.service';
import {IdentificationService} from '../services/identification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private identificationService: IdentificationService,
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionsService,
    private router: Router
  ) {
    this.formGroup = this.formBuilder.group({
      mail: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    });
  }

  ngOnInit() {
  }

  public attemptLogin() {
    const mail = this.formGroup.controls['mail'].value;
    const password = this.formGroup.controls['password'].value;
    this.identificationService.login(mail, password).then(() => {
        this.router.navigateByUrl('/');
      }).catch((err) => {
        alert(err);
      });
  }
}
