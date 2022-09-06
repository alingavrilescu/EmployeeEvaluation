import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiBase: string;
  constructor(private httpClient: HttpClient) {
    this.apiBase = environment.apiBase;
  }
  public getUsers(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(this.apiBase + 'api/Users');
  }
  public deleteUser(id: string): Observable<UserDTO> {
    return this.httpClient.delete<UserDTO>(this.apiBase + 'api/Users/' + id);
  }
  public addUser(newUser: UserDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(this.apiBase + 'api/Users', newUser);
  }
  public editUser(id: string, newUser: UserDTO): Observable<UserDTO> {
    return this.httpClient.put<UserDTO>(
      this.apiBase + 'api/Users' + id,
      newUser
    );
  }
}
