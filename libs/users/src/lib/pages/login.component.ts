import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styles: [],
})

export class LoginComponent implements OnInit {
    form: FormGroup = this.formBuilder.group({});
    isSubmitted = false;
    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this._initForm();
     }

     private _initForm() {
         this.form = this.formBuilder.group({
             user: ['', Validators.required],
             password: ['', Validators.required]
         })
     }

     get user (): AbstractControl {
        return this.form.get('user') as FormControl
     }

     get password(): AbstractControl {
         return this.form.get('password') as FormControl
     }


     submit($event: any) {
        $event.preventDefault();
         this.isSubmitted = true;
     }

}