import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCnpjComponent } from './input-cnpj/input-cnpj.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomInput } from './CustomInput';

const COMPONENTS = [InputCnpjComponent];

@NgModule({
  declarations: [...COMPONENTS, CustomInput],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgxMaskModule,

    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [...COMPONENTS],
})
export class InputsModule {}
