//userServices.ts

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    
}

export const fetchUser = (userId: number):Promise<User | {}> => {
    
}

export const updateUser = (user: User):Promise<void> => {
    
}

