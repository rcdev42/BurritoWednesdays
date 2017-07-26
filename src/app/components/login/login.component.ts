import { Component, OnInit } from '@angular/core';
import { AfAuthService } from "../../services/afAuth.service";
import { Router } from "@angular/router";

@Component({
  selector:     'app-login',
  templateUrl:  './login.component.html',
  styleUrls:    ['./login.component.css'],
  providers:    [ AfAuthService ]
})
export class LoginComponent implements OnInit {

  public error: any;

  constructor(private afAuthService: AfAuthService, private router: Router) { }

  ngOnInit() {
  }

  loginWithEmail(event, email, password) {
    event.preventDefault();

    // login
    this.afAuthService.loginWithEmail(email, password).then(() => {
      // redirect to home
      this.router.navigate(['']);
    })
      // handle error
      .catch((error: any) => {
        if (error) {
          this.error = error;
          console.log(this.error);
        }
      });
  }

}
