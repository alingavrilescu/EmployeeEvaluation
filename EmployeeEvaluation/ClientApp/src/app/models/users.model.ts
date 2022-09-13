import { Guid } from 'guid-typescript';
import { Project } from './project.model';

export class UserDTO {
  id?: Guid;
  name: string = '';
  email: string = '';
  role: string = '';
  departmentId?: Guid;
  projectId?: Guid;
}
