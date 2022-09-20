import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.module';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor( private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage( msg: string):void{
    this.snackBar.open(msg, 'X',{
      duration:3000,
      horizontalPosition:"right",
      verticalPosition: "top"
    })
  }

  //responsável por inserir no nosso backend
  create(product: Product):Observable<Product> {
    //mandar uma requisição http para o backend
    return this.http.post<Product>(this.baseUrl, product)

  }

  //ler uma lista de produtos cadastrados no backend
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl)
  }

  //ler por id
  readById(id :any):Observable<Product>{
    const url=`${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);

  }

  //atualizar
  update(product: Product  ): Observable<Product>{
    const url=`${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
  }

//deletar
delete(id: number): Observable<Product> {
    const url=`${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);

  }
}
