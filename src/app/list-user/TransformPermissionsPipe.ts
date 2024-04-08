import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { User } from '../model/model'; // Adjust the import path according to your project structure

@Pipe({
  name: 'transformPermissions'
})
export class TransformPermissionsPipe implements PipeTransform {
  transform(users: User[]): any[] {
    return users.map(user => ({
      NAME: (user.firstName || '') + ' ' + (user.lastName || ''),
      originalUser: user // Include the entire original user object for internal use
    }));
  }
}
@NgModule({
  declarations: [
    // other components
    TransformPermissionsPipe
  ],
  exports: [
    TransformPermissionsPipe
  ],
  // other module properties
})
export class TransformPermissionsPipeModule { }
