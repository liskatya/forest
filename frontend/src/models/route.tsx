import { Challenge } from "./challenge";
import { User } from "./user";

export interface Route {
    id: number;
    name: string;
    challenges: Challenge[];
    user: User;
}