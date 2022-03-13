import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/common/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  showLoader$ = this.loaderService.showLoader$;
  loaderText$ = this.loaderService.loaderText$;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {}
}
