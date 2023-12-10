import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  productForm: FormGroup;
  productArray: any = [];
  productTableArray: any = [];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      product: ['', [Validators.required]],
      prize: ['', [Validators.required]]
    });
  }

  get f() {
    return this.productForm.controls;
  }

  submitted: boolean = false;
  addProduct() {
    this.submitted = true;
    if (this.productForm.valid) {
      let obj = {
        product: this.productForm.value.product,
        prize: this.productForm.value.prize
      }
      this.productArray.push(obj)
    }
  }

  addTable(item: any) {
    let count = 1;
    let obj = {
      product: item.product,
      prize: item.prize,
      count: count
    }
    let isExist = this.productTableArray.some((e: any) => e.product === obj.product);
    if (isExist) {
      let existingProductIndex = this.productTableArray.findIndex((e: any) => e.product === obj.product);
      this.productTableArray[existingProductIndex].count++;
      this.productTableArray[existingProductIndex].prize = item.prize * this.productTableArray[existingProductIndex].count;
    } else {
      this.productTableArray.push(obj);
    }

    console.log(this.productTableArray);
  }
}
