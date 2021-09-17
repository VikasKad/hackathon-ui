import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    // store the URL so we can redirect after logging in
    public redirectUrl = '/customers';
    loginUrl = 'http://10.10.6.166:7575/nba/login';
    constructor(
        private http: HttpClient,
        private router: Router,
        private _snackBar: MatSnackBar
    ) { }

    login(username: string, password: string): void {
        const body = {
            username,
            password
        };
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        this.http.post(this.loginUrl, JSON.stringify(body), { headers: headers }).subscribe((res: any) => {
            // do whatever with your response
            this.isLoggedIn = true;
            console.log('res', res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', username);
            if (this.redirectUrl) {
                this.router.navigate([this.redirectUrl]);
            }
        }, (err) => {
            console.error('err', err);
            this.isLoggedIn = false;
            this._snackBar.open('Invalid Credentials', 'Okay', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
            });
            // this.router.navigate([this.redirectUrl]);
        });
    }

    logout(): void {
        this.isLoggedIn = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        this.router.navigate(['/login']);
    }
}