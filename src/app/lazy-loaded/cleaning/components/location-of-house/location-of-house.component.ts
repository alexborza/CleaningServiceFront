import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'app-location-of-house',
  templateUrl: './location-of-house.component.html',
  styleUrls: ['./location-of-house.component.scss']
})

export class LocationOfHouseComponent implements OnInit {

  counties: City[] = [];
  locationForm: any;

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.locationForm = this.controlContainer.control;
    this.counties = [{"abr":"ab","nume":"Alba"},{"abr":"ar","nume":"Arad"},{"abr":"ag","nume":"Argeș"},{"abr":"bc","nume":"Bacău"},{"abr":"bh","nume":"Bihor"},{"abr":"bn","nume":"Bistrița-Năsăud"},{"abr":"bt","nume":"Botoșani"},{"abr":"br","nume":"Brăila"},{"abr":"bv","nume":"Brașov"},{"abr":"b","nume":"București"},{"abr":"bz","nume":"Buzău"},{"abr":"cl","nume":"Călărași"},{"abr":"cs","nume":"Caraș-Severin"},{"abr":"cj","nume":"Cluj"},{"abr":"ct","nume":"Constanța"},{"abr":"cv","nume":"Covasna"},{"abr":"db","nume":"Dâmbovița"},{"abr":"dj","nume":"Dolj"},{"abr":"gl","nume":"Galați"},{"abr":"gr","nume":"Giurgiu"},{"abr":"gj","nume":"Gorj"},{"abr":"hg","nume":"Harghita"},{"abr":"hr","nume":"Harghita"},{"abr":"hd","nume":"Hunedoara"},{"abr":"il","nume":"Ialomița"},{"abr":"is","nume":"Iași"},{"abr":"if","nume":"Ilfov"},{"abr":"mm","nume":"Maramureș"},{"abr":"mh","nume":"Mehedinți"},{"abr":"ms","nume":"Mureș"},{"abr":"nt","nume":"Neamț"},{"abr":"ot","nume":"Olt"},{"abr":"ph","nume":"Prahova"},{"abr":"sj","nume":"Sălaj"},{"abr":"sm","nume":"Satu Mare"},{"abr":"sb","nume":"Sibiu"},{"abr":"sv","nume":"Suceava"},{"abr":"tr","nume":"Teleorman"},{"abr":"tm","nume":"Timiș"},{"abr":"tl","nume":"Tulcea"},{"abr":"vl","nume":"Vâlcea"},{"abr":"vs","nume":"Vaslui"},{"abr":"vn","nume":"Vrancea"}];
  }

}

interface City {
  abr: string,
  nume: string
}
