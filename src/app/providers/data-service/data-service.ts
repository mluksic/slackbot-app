import { Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {
    Events, Loading, LoadingController, PopoverController,
    ToastController
} from 'ionic-angular';
import { CONFIG } from '../../../app/app-config';

@Injectable()
export class DataServiceProvider {
    baseUrl = CONFIG.API_ENDPOINT;
    displayLoader = true;
    loading: Loading;

    constructor(
        public http: Http,
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public events: Events,
        public popoverCtrl: PopoverController
    ) { }

    getCollection = (collection, filters = '') => {
        return Observable.create(observer => {
            let url = '';
            url = (filters === '') ?
                this.baseUrl + collection : filters;
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.get(
                url,
                { headers: headers }
            ).map(res => res.json()).subscribe(
                res => {
                    observer.next(res);
                },
                error => {
                    this.errorHandler(error);
                }
            );
        });
    }

    getItem = (collection, itemId, filters = '') => {
        return Observable.create(observer => {
            let url = '';
            url = (filters === '') ?
                this.baseUrl + collection + '/' + itemId : filters;
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.get(
                url,
                { headers: headers }
            ).map(res => res.json()).subscribe(
                res => {
                    observer.next(res);
                },
                error => {
                    this.errorHandler(error);
                }
            );
        });
    }

    addItem = (collection, fields) => {
        return Observable.create(observer => {
            const url = this.baseUrl + '/' + collection;
            const headers = new Headers();
            const payload = JSON.stringify(fields);
            headers.append('Content-Type', 'application/json');

            this.http.post(
                url,
                payload,
                { headers: headers }
            ).map(res => res.json()).subscribe(
                res => {
                    observer.next(res);
                },
                error => {
                    console.log(error);
                    this.errorHandler(error);
                }
            );
        });
    }

    updateItem = (collection, fields, id) => {
        return Observable.create(observer => {
            const url = this.baseUrl + '/' + collection + '/' + id;
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const payload = JSON.stringify(fields);

            this.http.put(
                url,
                payload,
                { headers: headers }
            ).map(res => res.json()).subscribe(
                res => {
                    observer.next(res);
                },
                error => {
                    console.log(error);
                    this.errorHandler(error);
                }
            );
        });
    }

    deleteItem = (collection, id) => {
        return Observable.create(observer => {
            const url = this.baseUrl + '/' + collection + '/' + id;

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.http.delete(
                url,
                { headers: headers }
            ).subscribe(
                res => {
                    observer.next(res);
                },
                error => {
                    console.log(error);
                    this.errorHandler(error);
                }
            );
        });
    }

    toast = (message) => {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }

    showLoading = () => {
        if (this.displayLoader) {
            this.loading = this.loadingCtrl.create({
                content: "Please wait",
                duration: 10000,
            });
            this.loading.present();
        }
    }

    setShowLoading = show => {
        this.displayLoader = show;
    }

    stopLoading = () => {
        if (this.loading !== undefined && this.loading !== null) {
            this.loading.dismiss();
        }
    }

    showToast = (keyword, additional = '') => {
        const toast = this.toastCtrl.create({
            message: keyword + ((additional === '') ? '' : ' ' + additional),
            duration: 3000
        });
        toast.present();
    }

    errorHandler = response => {
        const body = JSON.parse(response._body);
        switch (response.status) {
            case 400:
                switch (body.message) {
                    default:
                        this.showToast('badRequest');
                        break;
                }
                break;
            case 401:
                this.showToast('unauthorized');
                this.events.publish('user:logout');
                break;
            case 403:
                this.showToast('forbidden');
                break;
            case 404:
                switch (body.message) {
                    default:
                        this.showToast('notFound');
                        break;
                }
                break;
            case 405:
                this.showToast('methodNotAllowed');
                break;
            case 500:
                this.showToast('serverError');
                break;
            default:
                this.showToast('fillRequiredInputs');
                break;
        }
    }

    getCurrentRole = () => {
        return window.localStorage.getItem('role');
    }

    isLoggedIn = () => {
        return this.getCurrentRole() !== null;
    }

    logout = () => {
        this.events.publish('user:logout');
    }

    // translate = (keyword) => {
    //     let translated;
    //     this.translateService.get(keyword).subscribe(value => {
    //         translated = value;
    //     });

    //     return translated;
    // }
}