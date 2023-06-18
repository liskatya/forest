import { Route } from "./route";

export interface Challenge {
    id: Number,
    title: string,
    description: string,
    difficulty: Number,
    positionX: Number,
    positionY: Number,
    kingApproved: boolean,
    psycoApproved: boolean,
    routes: Route[]
}