import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.module';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product={
    name:'',
    price:0.00
  }
   constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {

  }

  createProduct():void{
    this.productService.create(this.product).subscribe(()=>{
    this.productService.showMessage('Produto Criado!')
    //vai fazer a navegação para a tela de produto
    this.router.navigate(['/products']);
  })
}
  cancel():void{
    this.router.navigate(['/products']);
  }



}