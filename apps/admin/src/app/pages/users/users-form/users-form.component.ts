import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, User, UsersService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countriesList from 'i18n-iso-countries';
// import { timer } from 'rxjs';

declare const require: any;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {
  editMode = false;
  form: FormGroup = this.formBuilder.group({});
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: any = '';
  currentUserId: string = '';
  countries: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._initForm();
    this._getCountries();
    this._getId();
  }
  

  private _initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      street: [''],
      apartment: [''],
      zip: [''],
      isAdmin: [false],
      city: [''],
      country: [''],
    });
  }

  private _getCountries() {
    countriesList.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesList.getNames("en", {select: "official"})).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });
  }

  private _getId(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id'];
        this._getUser(params['id']);
      }
    })

  }

  private _getUser(id: string) {
    
    this.usersService.getUser(id).subscribe((user: User) => {
      this.form.patchValue({
        name: user.name,
        street: user.street,
        apartment: user.apartment,
        zip: user.zip,
        isAdmin: user.isAdmin,
        city: user.city,
        email: user.email,
        phone: user.phone,
        country: user.country,
      });
      this.password.setValidators([]);
    this.password.updateValueAndValidity();
    });

  }


  onSubmit() {
    this.isSubmitted = true;
    this._getFormData();
    // const userFormData = ;
    if (this.form.invalid) return
    const userFormData = this._getFormData();
    if(this.editMode) {
      this._updateUser(userFormData);
    } else {
      this._addUser(userFormData);
    }
  }

  private _updateUser(userFormData: User) {
    this.usersService.editUser(this.currentUserId, userFormData).subscribe((user: User) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Product ${user.name} is updated` 
      });
      // this.form.reset();
      this.isSubmitted = false;
      this.navigateBack();
    }, (error) => {
      console.error(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product is not updated!'
      })
    });
  }

  private _getFormData(): User {
    let userData: any = {};
    Object.keys(this.form.controls).forEach((key: any) => {
      (this.form.controls[key].value);
      userData[key] = this.form.controls[key].value
    })
    return userData; 
  }

  private _addUser(userFormData: User): void {
    this.usersService.createUser(userFormData).subscribe((user: User) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `User ${user.name} is created`
      });
      // this.form.reset();
      this.isSubmitted = false;
      this.navigateBack();
    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User is not created!'
      })
    });
  }

  navigateBack(): void {
    timer(2000)
      .toPromise().then(() => {
        this.location.back();
      });
  }


  get name(): AbstractControl {
    return (this.form.get('name')) as FormControl
  }

  get street(): AbstractControl {
    return (this.form.get('street')) as FormControl
  }

  get password(): AbstractControl {
    return (this.form.get('password')) as FormControl
  }


  get apartment(): AbstractControl {
    return (this.form.get('apartment')) as FormControl
  }

  get zip(): AbstractControl {
    return (this.form.get('zip')) as FormControl
  }

  get isAdmin(): AbstractControl {
    return (this.form.get('isAdmin')) as FormControl
  }

  get city(): AbstractControl {
    return (this.form.get('city')) as FormControl
  }

  get email(): AbstractControl {
    return (this.form.get('email')) as FormControl
  }

  get phone(): AbstractControl {
    return (this.form.get('phone')) as FormControl
  }

  get country(): AbstractControl {
    return (this.form.get('country')) as FormControl
  }

}

