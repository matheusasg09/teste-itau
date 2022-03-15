import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBusiness } from 'src/app/models/Company.interface';
import { CEPService } from 'src/app/services/common/cep.service';
import { LoaderService } from 'src/app/services/common/loader.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
  formGroup!: FormGroup;
  selectedCompany!: IBusiness;

  constructor(
    private loaderSerivce: LoaderService,
    private notificationSerivce: NotificationService,
    private formBuilder: FormBuilder,
    private CEPService: CEPService,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
    this.buildForm();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.notificationSerivce.error('Formulário Inválido');
      return;
    }

    this.notificationSerivce
      .confirm({
        text: 'Confirma as alterações?',
      })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.notificationSerivce.success('Informações Alteradas com Sucesso');
          console.log(this.formGroup.getRawValue());
          return;
        }
      });
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

  private getCompany(id: number): void {
    this.loaderSerivce.show('Carregando detalhes...');

    this.companyService
      .getCompany(id)
      .subscribe({
        next: (response) => {
          this.selectedCompany = response;
          this.formGroup.patchValue(response);
          this.getCEP();
        },
        error: () => {
          this.notificationSerivce.error('Falha ao carregar detalhes');
        },
      })
      .add(() => {
        this.loaderSerivce.hide();
      });
  }

  private getRouteParams(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (data) => {
        this.getCompany(data['id']);
      },
      error: () => {
        this.notificationSerivce.error('Falha ao carregar detalhes');
      },
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
