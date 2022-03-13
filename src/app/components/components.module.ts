import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InputsModule } from './inputs/inputs.module';

const COMPONENTS = [LoaderComponent, ButtonComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
    MatProgressSpinnerModule,

    InputsModule,
  ],
  exports: [...COMPONENTS, InputsModule],
})
export class ComponentsModule {}
