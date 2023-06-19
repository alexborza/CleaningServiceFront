import { DeepCleaningPrices } from "./DeepCleaningPrices";
import { DisinfectionCleaningPrices } from "./DisinfectionCleaningPrices";
import { PostConstructionCleaningPrices } from "./PostConstructionCleaningPrices";
import { StandardCleaningPrices } from "./StandardCleaningPrices";

export class CleaningPrices {
    id: number;
    standardCleaningPrices: StandardCleaningPrices;
    deepCleaningPrices: DeepCleaningPrices;
    postConstructionCleaningPrices: PostConstructionCleaningPrices;
    disinfectionCleaningPrices: DisinfectionCleaningPrices;
    paidParkingSpotPrice: number;
    pickUpKeysPrice: number;
}