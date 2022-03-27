import { DeepCleaningPricesDto } from "./DeepCleaningPricesDto";
import { DisinfectionCleaningPricesDto } from "./DisinfectionCleaningPricesDto";
import { PostConstructionCleaningPricesDto } from "./PostConstructionCleaningPricesDto";
import { StandardCleaningPricesDto } from "./StandardCleaningPricesDto";

export class CleaningServicePricesDto {
    id!: number;
    standardCleaningPrices!: StandardCleaningPricesDto;
    deepCleaningPrices!: DeepCleaningPricesDto;
    postConstructionCleaningPrices!: PostConstructionCleaningPricesDto;
    disinfectionCleaningPrices!: DisinfectionCleaningPricesDto;
    paidParkingSpotPrice!: number;
    pickUpKeysPrice!: number;
}