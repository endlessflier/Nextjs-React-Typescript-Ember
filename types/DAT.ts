
export interface DAT {
    id: string;
    type: Type;
}

export enum Type {
    Images = "images",
    UsageBasedItem = "usage_based_item",
    Users = "users"
}
