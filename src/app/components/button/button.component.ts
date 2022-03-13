import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() linkTo!: string;
  @Input() label!: string;
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() fullWidth = false;
  @Input() type = 'button';
  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
