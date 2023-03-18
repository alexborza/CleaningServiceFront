import { DeepCleaningPricesCreation } from "./DeepCleaningPricesCreation";
import { DisinfectionCleaningPricesCreation } from "./DisinfectionCleaningPricesCreation";
import { PostConstructionCleaningPricesCreation } from "./PostConstructionCleaningPricesCreation";
import { StandardCleaningPricesCreation } from "./StandardCleaningPricesCreation";

export class CleaningPriceCreation {
    standardCleaningPrices: StandardCleaningPricesCreation;
    deepCleaningPrices: DeepCleaningPricesCreation;
    postConstructionCleaningPrices: PostConstructionCleaningPricesCreation;
    disinfectionCleaningPrices: DisinfectionCleaningPricesCreation;
    paidParkingSpotPrice: number;
    pickUpKeysPrice: number;
}