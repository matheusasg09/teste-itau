import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CEPService } from 'src/app/services/common/cep.service';
import { LoaderService } from 'src/app/services/common/loader.service';
import { NotificationService } from 'src/app/services/common/notification.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  formGroup!: FormGroup;
  cepComplete: boolean = true;
  constructor(
    private loaderSerivce: LoaderService,
    private notificationSerivce: NotificationService,
    private formBuilder: FormBuilder,
    private CEPService: CEPService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    this.formGroup.get('cnpj')?.markAsDirty();
    if (this.formGroup.invalid) {
      this.checkFormValidations(this.formGroup);
      this.notificationSerivce.error('Formulário Inválido');
      return;
    }
    console.log(this.formGroup.getRawValue());
  }

  getCEP(): void {
    this.loaderSerivce.show('Carrendo Endereço...');
    const CEP = this.formGroup.get('cep')?.value;

    this.CEPService.getCep(CEP)
      .subscribe({
        next: (response) => {
          this.formGroup.patchValue({
            rua: response.logradouro,
            bairro: response.bairro,
            cidade: response.localidade,
            estado: response.uf,
          });
        },
        error: () => {
          this.notificationSerivce.error('Erro ao buscar CEP');
        },
      })
      .add(() => {
        this.loaderSerivce.hide();
      });
  }

  private checkFormValidations(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsDirty();
      control?.markAsTouched();
    });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      cep: [null],
      rua: [null],
      bairro: [null],
      estado: [null],
      cidade: [null],
      name: [null],
      business: [null],
      valuation: [null],
      cnpj: [null, [Validators.required]],
      active: [null],
    });
  }
}
