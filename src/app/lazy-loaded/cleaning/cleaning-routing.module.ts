import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleaningServiceDetailComponent } from './cleaning-service-detail/cleaning-service-detail.component';

const routes: Routes = [
  {
    path: 'standard-cleaning',
    component: CleaningServiceDetailComponent,
    data: {
      title: 'Standard Cleaning',
      type: 'Standard Cleaning'
    }
  },
  {
    path: 'disinfection-cleaning',
    component: CleaningServiceDetailComponent,
    data: {
      title: 'Disinfection and Environmental Cleaning',
      type: 'Disinfection Cleaning'
    }
  },
  {
    path: 'post-construction-cleaning',
    component: CleaningServiceDetailComponent,
    data: {
      title: 'Post Construction Cleaning',
      type: 'Post Construction Cleaning'
    }
  },
  {
    path: 'deep-cleaning',
    component: CleaningServiceDetailComponent,
    data: {
      title: 'Deep Cleaning',
      type: 'Deep Cleaning'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleaningRoutingModule { }
