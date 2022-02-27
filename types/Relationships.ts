import { DAT } from "./DAT";
import { Images } from "./Images";


export interface Relationships {
    images: Images;
    mileage_usage_item?: GeneratorUsageItem;
    owner: GeneratorUsageItem;
    primary_image: GeneratorUsageItem;
    generator_usage_item?: GeneratorUsageItem;
}

export interface GeneratorUsageItem {
    data: DAT;   
}


