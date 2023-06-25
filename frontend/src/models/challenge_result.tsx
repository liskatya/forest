import { Route } from "./route";
import { User } from "./user";
import { Challenge } from "./challenge";

export interface ChallengeResult {
    id: Number,
    route: Route,
    challenge: Challenge,
    user: User
}