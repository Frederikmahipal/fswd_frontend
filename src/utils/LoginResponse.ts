export interface LoginResponse {
    token: string;
    firstName: string;
    lastName: string;
    role: string;
   }
   
   export const handleLoginResponse = (response: LoginResponse) => {
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('firstName', response.firstName);
    sessionStorage.setItem('lastName', response.lastName);
    sessionStorage.setItem('userRole', response.role);
   };
   