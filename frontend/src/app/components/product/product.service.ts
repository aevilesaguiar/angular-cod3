import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.module';
import { Observable , EMPTY} from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor( private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage( msg: string, isError: boolean=false):void{
    this.snackBar.open(msg, 'X',{
      duration:3000,
      horizontalPosition:"right",
      verticalPosition: "top",
      panelClass:isError ?['.msg-error']: ['msg-sucess'] //se der erro ele mostra essa classe senão mostra sucesso
                                                        //como isError é false ele vai continuar mandando sucesso
    })
  }

  //responsável por inserir no nosso backend
  create(product: Product):Observable<Product> {
    //mandar uma requisição http para o backend
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }


  errorHandler(e:any): Observable<any>{
    console.log(e);
    this.showMessage('Ocorreu um erro!', true);
    //Esse método retorna um Observable vazio tipo EMPTY,
    return EMPTY;
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
