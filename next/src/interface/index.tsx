export interface UserInterface {
    id?: number; 
    name: string;
    birth: string;
    job: string;
    email: string;
    address: string;
    status: string;
    avatar?: File | string;
}