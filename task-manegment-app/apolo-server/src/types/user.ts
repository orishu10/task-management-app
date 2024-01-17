export interface RegisterUserAttributes {
    username: string;
    email: string;
    password_hash:string ;
  }


  export interface UserInterface {
    registerInput(registerInput: any, arg1: string): unknown;
    id? : string;
    username: string;
    email: string;
    password: string;
    token?: string;
}
  
 export interface ResponseUserAttributes extends RegisterUserAttributes {
    id : string;
    token?: string;
    message?: string;
    createdAt?: Date;
    updatedAt?: Date;
  

  }