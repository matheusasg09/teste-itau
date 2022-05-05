import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IBusiness } from 'src/app/models/Company.interface';
import { LoaderService } from 'src/app/services/common/loader.service';
import { NotificationService } from 'src/app/services/common/notification.service';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<IBusiness>();
  displayedColumns = ['name', 'business', 'valuation', 'active', 'actions'];

  constructor(
    private loaderSerivce: LoaderService,
    private notificationSerivce: NotificationService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  ngAfterViewInit(): void {
    this.setGridConfigurations();
  }

  goToDetailCompany(company: IBusiness): void {
    this.router.navigate(['detail'], { queryParams: { id: company.id } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getCompanies(): void {
    this.loaderSerivce.show('Carregando Empresas...');

    // Timeout apenas para exibir o loader
    setTimeout(() => {
      this.companyService
        .getCompanies()
        .subscribe({
          next: (companies) => {
            this.dataSource.data = companies;
          },
          error: () => {
            this.notificationSerivce.error('Erro ao carregar empresas');
          },
        })
        .add(() => {
          this.loaderSerivce.hide();
        });
    }, 2000);
  }

  private setGridConfigurations(): void {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) =>
      `${page + 1} de ${
        pageSize > length ? length : pageSize
      } de um total de ${length} registros`;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
