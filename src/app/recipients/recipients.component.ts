import { Component } from '@angular/core';
import { User, Recipient} from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccountService } from '../service/bank-account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-recipients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipients.component.html',
  styleUrl: './recipients.component.css'
})
export class RecipientsComponent {
  // Initially set the first tab as active
  activeTab: string = 'recipientsTab';

  // Function to change the active tab
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  public allUserRecipients: Recipient[] = [];
  loggedUserId:number = -1;

  constructor(private bankAccountService: BankAccountService, private router: Router, private popupService: PopupService) {
    let loggedUserIdAsString = sessionStorage.getItem('loggedUserID');
    
    if (loggedUserIdAsString !== null) {
      this.loggedUserId = parseInt(loggedUserIdAsString);
    } else {
      console.log('Error occurred: logged user id cannot be null!');
    }

   }

   ngOnInit() {
    this.loadAllUserRecipients();
  }

  loadAllUserRecipients(){
    this.bankAccountService.getAllRecipients().subscribe(
      (allUserRecipientsFromDB: Recipient[]) => {
        this.allUserRecipients = allUserRecipientsFromDB;

        console.log('All user recipients from db mocked');
        console.log(this.allUserRecipients);
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading users:', error);
      }
    );
  }

  editRecipient(recipient: Recipient, idx: number){
    console.log("Editing recipient at idx " + idx);
    console.log(recipient);
    const dialogRef=this.popupService.openEditRecipientPopup(recipient);
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.loadAllUserRecipients();
      }
    });
  }

  deleteRecipient(recipient: Recipient, idx: number){
    const dialogRef=this.popupService.openDeleteConfirmation();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Ako je korisnik potvrdio brisanje, pozovite funkciju za brisanje primaoca
        this.bankAccountService.deleteRecipient(recipient).subscribe(
          (response: any) => {
            console.log('Recipient deleted successfully');
            console.log(response);
          },
          (error: any) => {
            console.error('Error deleting recipient:', error);
          }
        );
  
        // Ažurirajte listu primaoca nakon brisanja
        this.allUserRecipients.splice(idx, 1);
      }
    });
  }

  addRecipient(){
    console.log("Adding recipient");
    const dialogRef= this.popupService.openAddRecipientPopup();
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.loadAllUserRecipients();
      }
    });
  }
}
