import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  appVersion = '1.0.1';
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
