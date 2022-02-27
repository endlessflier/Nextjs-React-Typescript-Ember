import { DistanceWeight } from "./DistanceWeight";


export interface Ranking {
    distance_weight: DistanceWeight;
    distance_weight_prod: number;
    is_new_listing: number;
    model_name: string;
    ranking_score: number;
    ranking_score2: number;
}
