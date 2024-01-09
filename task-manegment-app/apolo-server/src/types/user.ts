export interface RegisterRequestBody {
    username: string;
    email: string;
    password_hash:string ;
    id: number;
  }
  
 export interface RegisterResponsetBody extends RegisterRequestBody {
    token: string;
    message: string;
  }
