import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
// import { CustomPreloadService } from './serives/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module')
    .then(website => website.WebsiteModule),
    data: {
      // Precargar módulo
      preload: true
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./cms/cms.module')
    .then(cms => cms.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
