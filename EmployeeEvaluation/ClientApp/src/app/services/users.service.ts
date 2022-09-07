import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly url="Users"
  constructor(private httpClient: HttpClient) {
  }
  public getUsers(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(`${environment.apiUrl}/${this.url}`);
  }
  public getUserById(id: string): Observable<UserDTO>
  {
    return this.httpClient.get<UserDTO>(`${environment.apiUrl}/${this.url}/${id}`);
  }
  public addUser(newUser: UserDTO): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>(`${environment.apiUrl}/${this.url}`, newUser);
  }
  public editUser(id: string, userToEdit: UserDTO): Observable<UserDTO> {
  return this.httpClient.put<UserDTO>(`${environment.apiUrl}/${this.url}/${id}`,userToEdit);
  }
  public deleteUser(id: string): Observable<UserDTO> {
    return this.httpClient.delete<UserDTO>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
