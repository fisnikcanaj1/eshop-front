import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


// interface Category {
//   name: string,
//   code: string
// }

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  form: FormGroup = this.formBuilder.group({});
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: any = '';
  currentProductId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._getId();
  }

  private _initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [false]
    });
  }

  private _getCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  private _getId(): void {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.editMode = true;
        this._getProduct(params['id']);
      }
    })
    
  }

  private _getProduct(id: string) {
    this.productService.getProduct(id).subscribe((product: any) => {
      console.log(product);
      this.form.patchValue({
        name: product.name ,
        brand: product.brand,
        price: product.price ,
        category: product.category?._id,
        countInStock: product.countInStock ,
        description: product.description ,
        richDescription: product.richDescription ,
        image: product.image ,
        isFeatured: product.isFeatured 
      });
      this.imageDisplay = product.image;
    });   
  } 

  onImageUpload($event: any) {
    const file = $event.target.files[0];
    if (file) {
      this.form.patchValue({image: file});
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return

    const productFormData = this._getFormData();
    if(this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
    console.log(productFormData);
    // productFormData.append('name', this.name.value);

  }

  private _updateProduct(productFormData: any) {
    this.productService.editProduct(this.currentProductId, productFormData).subscribe((product: Product) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Product ${product.name} is updated` 
      });
      this.form.reset();
      this.isSubmitted = false;
      this.navigateBack();
    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product is not updated!'
      })
    });
  }

  private _getFormData(): FormData {
    let testAdd: any = new Array();
    const productFormData = new FormData();
    Object.keys(this.form.controls).forEach((key) => {
      console.log(key, (this.form.get(key) as FormControl).value);
      const currentValue = (this.form.get(key) as FormControl).value
      testAdd[key] = (this.form.get(key) as FormControl).value;
      productFormData.append(key, currentValue);
      
    });

    console.log(testAdd, "test add");

    // console.log(productFormData)
    return productFormData;
  }

  private _addProduct(productFormData: FormData): void {

    this.productService.createProduct(productFormData).subscribe((product: Product) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Product ${product.name} is created`
      });
      this.form.reset();
      this.isSubmitted = false;
      this.navigateBack();
    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Product is not created!'
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
    return this.form.get('name') as FormControl
  }

  get brand(): AbstractControl {
    return this.form.get('brand') as FormControl
  }

  get price(): AbstractControl {
    return this.form.get('price') as FormControl
  }

  get category(): AbstractControl {
    return this.form.get('category') as FormControl
  }

  get countInStock(): AbstractControl {
    return this.form.get('countInStock') as FormControl
  }

  get description(): AbstractControl {
    return this.form.get('description') as FormControl
  }

  get richDescription(): AbstractControl {
    return this.form.get('richDescription') as FormControl
  }

  get isFeatured(): AbstractControl {
    return this.form.get('isFeatured') as FormControl
  }

  get image(): AbstractControl {
    return this.form.get('image') as FormControl
  }

}

