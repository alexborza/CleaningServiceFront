export class StandardCleaningPricesCreation {
    standardServicePrice: number;
    standardServiceBedroom: number;
    standardServiceBathroom: number;
    standardServiceKitchen: number;

    constructor(standardServicePrice: number, standardServiceBedroom: number, standardServiceBathroom: number, standardServiceKitchen: number) {
        this.standardServicePrice = standardServicePrice;
        this.standardServiceBedroom = standardServiceBedroom;
        this.standardServiceBathroom = standardServiceBathroom;
        this.standardServiceKitchen = standardServiceKitchen;
    }
}