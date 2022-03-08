import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'test-angular-nest';

  token: string = '';

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.token = this.cookieService.get('access_token');

    console.log(this.token);
  }

  ngOnDestroy(): void {
    this.cookieService.delete('access_token');
  }
}
