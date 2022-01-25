import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleaningServiceDetailComponent } from './cleaning-service-detail/cleaning-service-detail.component';
import { OfficeCleaningComponent } from './office-cleaning/office-cleaning.component';

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
    path: 'office-cleaning',
    component: OfficeCleaningComponent,
    data: {
      title: 'Request a Quote for Office Cleaning',
      type: 'Office Cleaning'
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
