import { AttributesCategory } from "./AttributesCategory";
import { InsuranceState } from "./InsuranceState";


export interface PreferredPrimaryImageClass {
    amenity: null;
    best: boolean;
    category: AttributesCategory | null;
    description: string;
    position: number;
    primary: boolean;
    rental_id: number;
    review: null;
    skip_enhance: boolean;
    status: InsuranceState;
    tags: string;
    url: string;
    video: boolean;
}
