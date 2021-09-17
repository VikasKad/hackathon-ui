import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  customerDetails: any;
  customerData: any;
  isLoading = true;
  customerRelationship: any;
  customerSpend: any;
  productCount = 0;
  isCreditCardSpentAvail = false;
  randomChannelValues: any;
  isRelationshipAvail = false;
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private sharedSvc: SharedService

  ) { }

  ngOnInit(): void {
    this.customerData = this.sharedSvc.getCustomerDetails() || {};
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      // fetch customer details
      this.getCustomerDetails(id);
      this.getRelationshipDetails(id);
      this.getSpendAnalysis(id);
    } else {
      this.customerDetails = {};
      this.isLoading = false;
    }
    this.randomChannelValues = [];
    for (let i = 0; i < 4; i++) {
      this.randomChannelValues.push(Math.random() < 0.5);
    }
    console.log('random', this.randomChannelValues);

  }
  getSpendAnalysis(id: any): void {

    this.apiService.get('/spend?customer_id=' + id).subscribe((res: any) => {
      if (res.data && res.data.length) {
        this.customerSpend = res.data[0];
        this.isCreditCardSpentAvail = typeof this.customerSpend.spend_analysis.credit_card_spend === 'string' ? false : true;
      } else {
        this.customerSpend = {};
      }
      console.log('customer spent', this.customerSpend);
    }, (err) => {
      this.customerSpend = {};
    })
  }
  getRelationshipDetails(id: any) {

    this.apiService.get('/relation?customer_id=' + id).subscribe((res: any) => {
      if (res.data && res.data.length) {
        this.customerRelationship = res.data[0];
        this.isRelationshipAvail = typeof this.customerRelationship[0] === 'string' ? false : true;
      } else {
        this.customerRelationship = [];
      }
      console.log('customer relationship', this.customerRelationship);
    }, (err) => {
      this.customerRelationship = [];
    })
  }
  getCustomerDetails(id: any) {

    this.apiService.get('/customer?customer_id=' + id).subscribe((res: any) => {
      this.isLoading = false;
      if (res.data && res.data.length) {
        this.customerDetails = res.data[0];
        this.productCount = Object.keys(this.customerDetails.product_details_section).length;

        Object.keys(this.customerDetails.eligible_section).forEach((element: any) => {
          this.customerDetails.eligible_section[element] = Math.round(this.customerDetails.eligible_section[element] * 100);
        });
      } else {
        this.customerDetails = {};

      }
    }, (err) => {
      this.customerDetails = {};
    })
  }
  openDialog() {
    this._snackBar.open('Offer Sent Successfully', 'Okay', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
  getOffers(offer: any) {
    offer = offer.slice(0, 5);
    return offer;
  }

}
