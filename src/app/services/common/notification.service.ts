import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { from, Observable, pluck } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private confirmConfig: SweetAlertOptions = {
    icon: 'question',
    confirmButtonText: 'Confirmar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#7030a0',
    heightAuto: false,
    showCloseButton: true,
    customClass: {
      cancelButton: 'Swal__cancelButton',
    },
  };

  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.preventDuplicates = true;
    this.toastr.toastrConfig.resetTimeoutOnDuplicate = true;
    this.toastr.toastrConfig.timeOut = 10000;
    this.toastr.toastrConfig.progressBar = true;
  }

  confirm(options: SweetAlertOptions): Observable<boolean> {
    return from(
      Swal.fire({
        ...this.confirmConfig,
        ...options,
      })
    ).pipe(pluck('isConfirmed'));
  }

  success(title: string): void {
    this.toastr.success(title, 'Sucesso!', {
      progressBar: true,
    });
  }

  error(title: string): void {
    this.toastr.error(title, 'Erro!', {
      progressBar: true,
    });
  }

  warning(title: string): void {
    this.toastr.warning(title, 'Cuidado!', {
      progressBar: true,
    });
  }

  info(title: string): void {
    this.toastr.info(title, 'Ops!', {
      progressBar: true,
    });
  }
}
