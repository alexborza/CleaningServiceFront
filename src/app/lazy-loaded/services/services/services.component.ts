import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningServiceDescriptionsDto } from 'src/app/core/dto/CleaningServiceDescriptionDto';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { CleaningServiceType } from '../../cleaning/models/cleaning-service-type';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  path: string;
  title: string;
  type: string;
  description: string;
  images = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cleaningApi: CleaningApiService
  ) { }

  ngOnInit(): void {
    this.getRouteData();
    this.getDescription();
    this.getImages();
  }

  private getRouteData(){
    this.path = this.router.url.split('/')[2];
    this.title = this.route.snapshot.data?.['title'];
    this.type = this.route.snapshot.data?.['type'];
  }

  private getDescription(){
    this.cleaningApi.getDescriptions().subscribe(res => {
      this.getDescriptionByType(res);
    })
  }

  private getImages(){
    switch(this.type){
      case CleaningServiceType.StandardCleaning:
        this.images = [
          {src: 'assets/images/standard/standard1.jpg'},
          {src: 'assets/images/standard/standard3.jpeg'}
        ]
        break;
      case CleaningServiceType.DeepCleaning:
        this.images = [
          {src: 'assets/images/deep/deep1.png'},
          {src: 'assets/images/deep/deep2.jpg'}
        ]
        break;
      case CleaningServiceType.PostContructionCleaning:
        this.images = [
          {src: 'assets/images/post-construction/post2.jpg'},
          {src: 'assets/images/post-construction/post1.jpg'}
        ]
        break;
      case CleaningServiceType.DisinfectionCleaning:
        this.images = [
          {src: 'assets/images/disinfection/disinfection1.jpg'},
          {src: 'assets/images/disinfection/disinfection2.jpg'}
        ]
        break;
      default:
        break
    }
  }

  private getDescriptionByType(res: CleaningServiceDescriptionsDto){
    switch(this.type){
      case CleaningServiceType.StandardCleaning:
        this.description = res.standardCleaningDescription;
        break;
      case CleaningServiceType.DeepCleaning:
        this.description = res.deepCleaningDescription;
        break;
      case CleaningServiceType.PostContructionCleaning:
        this.description = res.postConstructionCleaningDescription;
        break;
      case CleaningServiceType.DisinfectionCleaning:
        this.description = res.disinfectionCleaningDescription;
        break;
      default:
        break
    }
  }

  bookNow(){
    this.router.navigate(["/book-a-cleaning", this.path]);
  }
}
