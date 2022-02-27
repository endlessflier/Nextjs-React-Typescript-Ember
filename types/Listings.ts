import { DAT } from "./DAT";
import { DatumAttributes } from "./DatumAttributes";
import { Included } from "./Included";
import { Meta } from "./Meta";
import { Relationships } from "./Relationships";

export interface Listing {
    data:     Datum[];
    included: Included[];
    meta:     Meta;
}

export interface Datum {
    id:            string;
    type:          string;
    attributes:    DatumAttributes;
    relationships: Relationships;
}


