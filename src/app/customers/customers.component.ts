import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../services/api.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['ncodpers', 'customer_name', 'segmento', 'ind_actividad_cliente', 'sexo', 'age', 'nationality'];
  dataSource: any;
  isLoading = true;
  value = '';
  loggedInUser = '';
  constructor(
    private apiService: ApiService,
    private sharedSvc: SharedService,
    private authSvc: AuthService
  ) {
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
  }

  ngOnInit(): void {
    this.apiService.get('/customers?pageNo=1&pageSize=1000').subscribe((res: any) => {
      this.isLoading = false;
      this.dataSource.data = res.data;
      this.dataSource.sort = this.sort;
    }, (err) => {
      this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    })
    this.loggedInUser = localStorage.getItem('user') || '';
  }

  selectedCustomer(cust: any) {
    this.sharedSvc.setCustomerDetails(cust);
  }
  private paginator!: MatPaginator;
  private sort!: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;

  }
  logout() {
    console.log('logout');

    this.authSvc.logout();

  }
  valueChange(ev: any) {
    this.dataSource.filter = ev.trim().toLocaleLowerCase();

  }

}

export interface PeriodicElement {
  ncodpers: number;
  customer_name: string;
  segmento: string;
  sexo: string;
  ind_actividad_cliente: string;
  age: number;
  nationality: string;
}