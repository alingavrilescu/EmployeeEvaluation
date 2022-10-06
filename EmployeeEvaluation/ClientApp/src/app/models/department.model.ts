import { Guid } from 'guid-typescript';
import { UserDTO } from './users.model';

export class Department {
  id?: Guid;
  name: string = '';
  headOfDepartmentId!: string;
  users?: UserDTO[];
}
