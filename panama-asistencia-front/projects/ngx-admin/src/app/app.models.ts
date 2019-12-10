export class User {
    id: number;
    name: string;
    last_name: string;
    dni: string;
    email:string;
    password: string;
    phone: string;
    username: string;
    address: string;
    policy: string;
    avatar_file_name: string;
    role: Role;
    token: string;
}

export class Role {
    id: number;
    name: string;
    description: string; 
}

export class Platform{
    name: string;
    description: string;
    avatar_file_name: File;
    status: number;
}

