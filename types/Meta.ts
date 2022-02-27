import { Experiments } from "./Experiments";
import { PriceHistogram } from "./PriceHistogram";
import { VehicleType } from "./VehicleType";


export interface Meta {
    radius: number;
    lat: number;
    lng: number;
    city: string;
    state: string;
    country: string;
    country_code: string;
    country_name: string;
    total: number;
    total_unavailable: number;
    start_position: number;
    stop_position: number;
    price_max: number;
    price_min: number;
    price_average: number;
    price_histogram: PriceHistogram;
    vehicle_types: VehicleType[];
    locale: string;
    suggested: boolean;
    experiments: Experiments;
    request: Experiments;
    FlexibleDates: null;
}
