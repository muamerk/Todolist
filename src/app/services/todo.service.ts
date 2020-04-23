import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

import { enableProdMode } from '@angular/core';
import { AppModule } from '../../app/app.module';
import { environment } from '../../environments/environment';
if (environment.production) {
  enableProdMode();
}

const httpOptions ={
  headers: new HttpHeaders ({
    'Content-Type': 'applicaton/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';

  constructor(private http:HttpClient) { }

  // Get Todos
  getTodos():Observable<Todo []> {
    return this.http.get<Todo []>(`${this.todosUrl}${this.todosLimit}`);
    
  }

  // Delete Todo
  deleteTodo(todo:Todo):Observable<Todo>{
    // Remove from UI
    const url = `${this.todosUrl}/${todo.id}`;
    // Remove from server
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }


  // Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);

  }
}
