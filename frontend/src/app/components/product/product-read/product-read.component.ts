import { Component, OnInit } from '@angular/core';
import { Product } from '../product.module';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

   products: Product[]=[];

   displayedColumns=['id','name','price'];

  constructor(private productService: ProductService) { }

  //quando o componente é inicializado
  ngOnInit(): void {
    //chamamos o método read dentro do service que vai fazer uma requisição do tipo get
    //no nosso backend retorna para nós um Observable que tem uma lista de produtos
    //aplicamos um subscribe passando a função arrow que recebe os products
    //e o resultado atribuímos para a variavels products que declaramos acima
    //de tal forma que a variavel products vai ter os dados do produtos que foram obtidos
    //no back end
    this.productService.read().subscribe(products => {
      this.products = products;
      console.log(products)
    })
  }


  }
