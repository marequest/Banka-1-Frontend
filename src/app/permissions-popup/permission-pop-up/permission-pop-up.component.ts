import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, Permissions } from '../../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionsService } from '../../service/permissions.service';
import {OrangeButtonModule} from "../../welcome/redesign/OrangeButton";
import {OutlineOrangeButtonModule} from "../../welcome/redesign/OutlineOrangeButton";

@Component({
  selector: 'app-permission-pop-up',
  standalone: true,
  imports: [CommonModule, FormsModule, OrangeButtonModule, OutlineOrangeButtonModule],
  templateUrl: './permission-pop-up.component.html',
  styleUrl: './permission-pop-up.component.css'
})
export class PermissionPopUpComponent implements OnInit {

  public addedPermission:string='';
  public availablePermissions:Permissions[] = [];
  public allPermissionFromDb:Permissions[] = [];

  /*Modify the permission-dialog.component.ts file to
  accept data (the user object) passed into the dialog. Import MAT_DIALOG_DATA and MatDialogRef to facilitate this.*/
  constructor(
    public dialogRef: MatDialogRef<PermissionPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    public apiService:PermissionsService) {}

    ngOnInit() {
      this.apiService.getPermissions().subscribe(
        perms => {

          this.allPermissionFromDb = perms;

          this.setDropDownToPermissionUserDoNotHave();
        },
        error => {

        }
      )
    }

    onSelectPermission() {
      this.setDropDownToPermissionUserDoNotHave();
    }

    setDropDownToPermissionUserDoNotHave(){
      const permissionsUserDoNotHave = this.allPermissionFromDb.filter(pFromDB =>
        !this.user.permissions.some(pFromUser => pFromDB.name === pFromUser.name)
      );

      this.availablePermissions = permissionsUserDoNotHave;
    }

    removePermission(index: number) {
      console.log("Removed perm: ");
      console.log(this.user.permissions[index]);
      this.user.permissions.splice(index, 1);
      this.setDropDownToPermissionUserDoNotHave();
    }

    addPermission(){
      console.log('Add permission clicked.');
      console.log(this.addedPermission);
      if(this.isStringNotBlank(this.addedPermission) && !this.isUserContainingPerm(this.addedPermission)){
        const newPermission: Permissions = {
          name: this.addedPermission,
          description: 'Default description', // Placeholder description, replace or modify as needed
        };

        this.user.permissions.push(newPermission);
        this.setDropDownToPermissionUserDoNotHave();
      }
    }

    save(){
      console.log("Saved");
      this.addUserPermissions(this.user);
      this.dialogRef.close(this.user);
    }

    cancel(){
      console.log("Cancel");
      this.dialogRef.close('Dialog closed by cancel');
    }

    exit(){
      this.dialogRef.close('Dialog closed by exit');
    }

    isStringNotBlank(str:string) {
      return (str !== null && str !== undefined && str.trim() !== '');
    }

    isUserContainingPerm(perm:string){
      return this.user.permissions.some(permission => permission.name === perm);
    }

    /**
    Api call wrapper.

    user - User who's permissions are modified.
    permissions - added or modified permissions.
    flag - if set to true adds and if set to false removes modifeied permissions.
   **/
  modifyUserPermissions(user: User, permissions: Permissions[], flag: boolean){
    let userId = user.userId;
    let permissionsToModify: string[] = permissions.map(permission => permission.name);

    console.log("modifyUserPermissions wrapper log:");
    console.log(user);
    console.log(userId);
    console.log(permissionsToModify);
    console.log(flag);

    this.apiService.modifyUserPermissions(userId, permissionsToModify, flag).subscribe(
      response => {
        console.log('Success:', response);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  addUserPermissions(user:User){
    console.log("addUserPermissions wrapper log:");
    console.log(user);

    this.apiService.addUserPermissions(user).subscribe(
      response => {
        console.log('Success:', response);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}
