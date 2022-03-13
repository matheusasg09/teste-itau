import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectivesModule } from './directives/directives.module';
import { PagesModule } from './pages/pages.module';
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NgxMaskModule.forRoot({ validation: true }),
    ToastrModule.forRoot(),

    ComponentsModule,
    SharedModule,
    PipesModule,
    DirectivesModule,
    PagesModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
