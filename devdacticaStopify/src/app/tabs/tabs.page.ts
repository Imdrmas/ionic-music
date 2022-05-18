import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';



@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
 @ViewChild(IonTabs) tabs: IonTabs;
 selected = '';
 progress = 42;
 passData = 'Pass Data';

  constructor() {

  }

  setSelectedTab() {
    this.selected = this.tabs.getSelected();
    console.log(this.passData);
   console.log( this.selected );
    
  }

}
