import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleaningType } from 'src/app/core/model/representation/cleaning_service/CleaningType';
import { CleaningServiceCreationComponent } from './cleaning-service-creation/cleaning-service-creation.component';

const routes: Routes = [
  {
    path: 'standard-cleaning',
    component: CleaningServiceCreationComponent,
    data: {
      title: 'Standard Cleaning',
      type: CleaningType.STANDARD
    }
  },
  {
    path: 'disinfection-cleaning',
    component: CleaningServiceCreationComponent,
    data: {
      title: 'Disinfection and Environmental Cleaning',
      type: CleaningType.DISINFECTION
    }
  },
  {
    path: 'post-construction-cleaning',
    component: CleaningServiceCreationComponent,
    data: {
      title: 'Post Construction Cleaning',
      type: CleaningType.POST_CONSTRUCTION
    }
  },
  {
    path: 'deep-cleaning',
    component: CleaningServiceCreationComponent,
    data: {
      title: 'Deep Cleaning',
      type: CleaningType.DEEP
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleaningRoutingModule { }
