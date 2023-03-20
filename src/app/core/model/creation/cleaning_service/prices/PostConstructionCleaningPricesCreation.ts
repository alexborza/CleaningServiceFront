export class PostConstructionCleaningPricesCreation {
    postConstructionServicePrice: number;
    roomPrice: number;

    constructor(postConstructionServicePrice: number, roomPrice: number) {
        this.postConstructionServicePrice = postConstructionServicePrice;
        this.roomPrice = roomPrice;
    }
}