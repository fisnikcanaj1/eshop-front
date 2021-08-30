import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup ;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  categoryId: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute) {
    this.form = this.formBuilder.group({});
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['']
    });

    this.checkEditMode();
 
  }

  private checkEditMode() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(params['id']) {
        this.editMode = true;
        this.getCategory(id)
        this.categoryId = id;
      }
    });
  }

  getCategory(id: string) {
    this.categoryService.getCategory(id).subscribe((category) => {
      this.form.setValue({
        name: category.name,
        icon: category.icon,
        color: category.color
      });
    })
  }

  get name ():  AbstractControl {
    return this.form.get('name') as FormControl;
  }

  get icon (): AbstractControl {
    return this.form.get('icon') as FormControl;
  }

  get color (): AbstractControl {
    return this.form.get('color') as FormControl;
  }


  onSubmit() {
    this.isSubmitted = true;
    console.log(this.name.invalid && this.isSubmitted);
    if(this.form.invalid) {
      return;
    }

    const category: Category = {
      name: this.name.value,
      icon: this.icon.value,
      color: this.color.value,
    }

    if(this.editMode) {
      this._editCategory(category);
    } else {
     this._addCategory(category);
    }
  }

  private _editCategory(category: Category): void {
    this.categoryService.editCategory(this.categoryId, category).subscribe(item => {
      this.messageService.add({severity:'success', summary:'Category updated successfully'});
      this.isSubmitted = false;
      this.navigateBack();
    });
  }

  private _addCategory(category: Category): void {
    this.categoryService.createCategory(category).subscribe((category: Category) => {       
      this.messageService.add({
        severity:'success', 
        summary:'Success',
        detail: `Category ${category.name} is created`});
      // this.form.reset();
      this.isSubmitted = false;
      this.navigateBack();
    }, () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Category is not created!'
      })
    });
  }

  navigateBack(): void {
    timer(2000)
    .toPromise().then(() => {
      this.location.back();
    });
  }

  onReject() {
    this.messageService.clear();
  }
}
