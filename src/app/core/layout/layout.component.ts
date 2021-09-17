import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  loadingRoute = false;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  loggedInUser = '';


  constructor(
    private observer: BreakpointObserver,
    private authSvc: AuthService
    ) { }

  ngOnInit(): void {
    
    this.loggedInUser = localStorage.getItem('user') || '';
  }
  logout(): void {
    
    this.authSvc.logout();

  }
}