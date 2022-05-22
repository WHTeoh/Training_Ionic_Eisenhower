import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskFormPage } from '../task-form/task-form.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private modalController: ModalController) { }

  async createNewTask() {
    const modal = await this.modalController.create({
      component: TaskFormPage,
      componentProps: {
        TaskObject: null
      },
      swipeToClose: true,
    })
    await modal.present();

    // const { data } = await modal.onWillDismiss();

  }
}
