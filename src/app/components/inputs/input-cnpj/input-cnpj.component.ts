import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import FormChecker from 'src/app/utils/form-checker';
import { CustomInput } from '../CustomInput';

@Component({
  selector: 'app-input-cnpj',
  templateUrl: './input-cnpj.component.html',
  styleUrls: ['./input-cnpj.component.scss'],
})
export class InputCnpjComponent extends CustomInput {
  @Input() label = 'CNPJ';
  @Input() icon!: string;
  override control = new FormControl(null, FormChecker.cnpj);
  override errorList = ['invalidCnpj'];
}
