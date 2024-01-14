export interface RegisterUserAttributes {
    username: string;
    email: string;
    password_hash:string ;
    id : string;
  }


  export interface UserInterface {
    id : string;
    username: string;
    email: string;
    password: string;
    token: string;
}
  
 export interface ResponseUserAttributes extends RegisterUserAttributes {
    token: string;
    id : string;
    message: string;

  }