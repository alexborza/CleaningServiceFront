export class DeepCleaningPricesCreation {
    deepServicePrice: number;
    deepServiceBedroom: number;
    deepServiceBathroom: number;
    deepServiceKitchen: number;

    constructor(deepServicePrice: number, deepServiceBedroom: number, deepServiceBathroom: number, deepServiceKitchen: number) {
        this.deepServicePrice = deepServicePrice;
        this.deepServiceBedroom = deepServiceBedroom;
        this.deepServiceBathroom = deepServiceBathroom;
        this.deepServiceKitchen = deepServiceKitchen;
    }
}