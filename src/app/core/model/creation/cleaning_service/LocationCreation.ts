export class LocationCreation {
    county: string;
    city: string;
    address: string;

    constructor(county: string, city: string, address: string) {
        this.county = county;
        this.city = city;
        this.address = address;
    }
}