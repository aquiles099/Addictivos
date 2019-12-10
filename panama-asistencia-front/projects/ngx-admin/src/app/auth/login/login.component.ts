import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthService, NbAuthResult } from '@nebular/auth';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  // constructor() { }
  resp: any;

  ngOnInit() {
    localStorage.setItem('load', '1');
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.resp = result;
      console.log(this.resp);

      this.submitted = false;

      if (result.isSuccess() == true) {
        this.messages = result.getMessages();
        localStorage.setItem("user", JSON.stringify(this.resp.response.body.data.user));

      }
      if (result.isFailure() == true ){
        this.errors = result.getErrors();

      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

}
