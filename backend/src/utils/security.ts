import { User } from "../entity/User";


export function sanitizeFields(user: User) {
    
    if(user.password) delete user.password;
    return user;
}