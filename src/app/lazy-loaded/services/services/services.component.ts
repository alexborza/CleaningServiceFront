import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CleaningDescription } from 'src/app/core/model/representation/cleaning_service/description/CleaningDescription';
import { Role } from 'src/app/core/model/representation/users/Role';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  title: string;
  type: string;
  description: string;
  canBookNow: boolean;
  images = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private cleaningApi: CleaningApiService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.type = params['type'];
        this.initializeContent();
      }
    );
    this.canBook();
  }

  private initializeContent(){
    this.getDescription();
    this.getImagesAndTitle();
  }

  private canBook(){
    const role = this.tokenStorage.getUser()?.role;
    this.canBookNow = role === Role.USER || role === undefined;
  }

  private getDescription(){
    this.cleaningApi.getCleaningDescriptions().subscribe(res => {
      this.getDescriptionByType(res);
    })
  }

  private getImagesAndTitle(){
    switch(this.type){
      case 'standard-cleaning':
        this.images = [
          {src: 'assets/images/standard/standard1.jpg'},
          {src: 'assets/images/standard/standard3.jpeg'}
        ]
        this.title = 'Standard Cleaning';
        break;
      case 'deep-cleaning':
        this.images = [
          {src: 'assets/images/deep/deep1.png'},
          {src: 'assets/images/deep/deep2.jpg'}
        ]
        this.title = 'Deep Cleaning';
        break;
      case 'post-construction-cleaning':
        this.images = [
          {src: 'assets/images/post-construction/post2.jpg'},
          {src: 'assets/images/post-construction/post1.jpg'}
        ]
        this.title = 'Post Construction Cleaning';
        break;
      case 'disinfection-cleaning':
        this.images = [
          {src: 'assets/images/disinfection/disinfection1.jpg'},
          {src: 'assets/images/disinfection/disinfection2.jpg'}
        ]
        this.title = 'Disinfection Cleaning';
        break;
      default:
        break
    }
  }

  private getDescriptionByType(res: CleaningDescription){
    switch(this.type){
      case 'standard-cleaning':
        this.description = res.standardCleaningDescription;
        break;
      case 'deep-cleaning':
        this.description = res.deepCleaningDescription;
        break;
      case 'post-construction-cleaning':
        this.description = res.postConstructionCleaningDescription;
        break;
      case 'disinfection-cleaning':
        this.description = res.disinfectionCleaningDescription;
        break;
      default:
        break
    }
  }

  bookNow(){
    this.router.navigate(["/book-a-cleaning", this.type]);
  }
}
