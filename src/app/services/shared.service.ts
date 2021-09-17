import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    customerDetails = {};
    constructor() { }
    getCustomerDetails(): any {
        return this.customerDetails;
    }
    setCustomerDetails(data: any): void {
        this.customerDetails = data;
    }
}