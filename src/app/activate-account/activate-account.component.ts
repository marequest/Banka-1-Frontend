import {Component} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {z, ZodError, ZodIssue} from "zod";
import {FormsModule} from "@angular/forms";
import {CustomerService} from "../service/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    FormsModule
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {
  stage: 1 | 2 | 3;

  //Stage 1
  email: string = ""
  accountNumber: string = ""
  phoneNumber: string = ""

  //Stage 2
  activationCode: string = ""

  //Stage 3
  password: string = ""
  confirmPassword: string = ""

  error = "";


  firstStageSchema = z.object({
    email: z.string().email(),
    accountNumber: z.string().min(18).max(18),
    phoneNumber: z.string().min(9).max(16)
  })

  secondStageSchema = z.object({
    activationCode: z.string().uuid()
  })

  thirdStageSchema = z.object({
    password: z.string().regex(/^(?=.*\d.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,32}$/), // Regex to support rules set by the documentation
    confirmPassword: z.string().regex(/^(?=.*\d.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,32}$/)
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match."
      });
    }
  });

  constructor(public customerService: CustomerService, public router: Router) {
    this.stage = 1;
  }

  validateData() {
    if(this.stage === 1) {
      const parseResp = this.firstStageSchema.safeParse(
        {
            email: this.email,
            accountNumber: this.accountNumber,
            phoneNumber: this.phoneNumber
          }
        );
      if(!parseResp.success) {
        this.error = this.parseErrors(parseResp.error);
        return false;
      }
      return true;
    } else if (this.stage === 2) {
      const parseResp = this.secondStageSchema.safeParse(
        {
          activationCode: this.activationCode
        }
      );
      if(!parseResp.success) {
        this.error = this.parseErrors(parseResp.error);
        return false;
      }
      return true;
    } else if (this.stage === 3) {
      const parseResp = this.thirdStageSchema.safeParse(
        {
          password: this.password,
          confirmPassword: this.confirmPassword
        }
      );
      if(!parseResp.success) {
        this.error = this.parseErrors(parseResp.error);
        return false;
      }
      return true;
    }
    return false;
  }

  async generateCode() {
    const resp = await this.customerService.initialActivation(this.email, this.accountNumber, this.phoneNumber);
    console.log(resp);
    if(!resp) {
      this.error = "Error while activating account. Please contact support or try again.";
    }
  }

  async finishActivation() {
    const resp = await this.customerService.finalActivation(this.activationCode, this.password);
    if(!resp) {
      this.previousStage();
      this.error = "Activation code is not correct. Please try again";
    }

    await this.router.navigate(["login"])
  }

  public async nextStage() {
    if(!this.validateData()) return;
    this.error = ""
    this.stage++;

    if(this.stage > 3) {
      await this.finishActivation();
      this.stage = 3;
    }
  }
  public previousStage() {
    this.stage--;
    if(this.stage < 1) {
      this.stage = 1;
    }
  }

  parseErrors(errors: ZodError): string {
    let errorString = "";
    for(let error of errors.errors) {
      errorString += this.parseError(error) + "\n";
    }

    return errorString;
  }

  parseError(error: ZodIssue): string {
    const errorMap: {[key: string]: string} = {
      "email": "Email is invalid.",
      "accountNumber": "Account number is invalid.",
      "phoneNumber": "Phone number is invalid.",
      "activationCode": "Please provide the activation code.",
      "password": "Password needs to have at least 8 characters, at most 32 characters, 2 digits, one lower case and one upper case letter.",
      "confirmPassword": ""
    }

    if(error.code === "custom") {
      return "Passwords do not match.";
    }

    return errorMap[error.path[0] as string];
  }

}
