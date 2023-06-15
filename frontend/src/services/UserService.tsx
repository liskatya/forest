import { User } from "../models/user"

export class UserService {
    static deauthenticate() {
        sessionStorage.clear();
    }

    static authenticate(user: User) {
        sessionStorage.setItem("id", user.id.toString());
    }

    static userId(): Number {
        return Number(sessionStorage.getItem("id"));
    }

    static async userData(): Promise<User | null> {
        const userId = this.userId();
        try {
            const response = await fetch(`http://localhost:8080/api/user/${userId}`);
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    }
}