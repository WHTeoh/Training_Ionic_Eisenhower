import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskFormPage } from '../task-form/task-form.page';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  public OnGoingTasks: any = []
  public Urgent_Important_Tasks: any = []
  public Urgent_Not_Important_Tasks: any = []
  public Not_Urgent_Important_Tasks: any = []
  public Not_Urgent_Not_Important_Tasks: any = []

  constructor(
    private modalController: ModalController,
    private dataProvider: DataProviderService
  ) {
    this.requestFetchTasks()
  }

  async requestFetchTasks() {
    const resp: any = await this.dataProvider.Tasks_ViewAllTasks();
    try {
      if (typeof resp !== "undefined" && Array.isArray(resp.Result) && resp.Result.length > 0) {
        this.OnGoingTasks = resp.Result.filter(el => el.isComplete == 0)

        this.Urgent_Important_Tasks = this.OnGoingTasks.filter(el => el.TaskPriorityID == 1)
        this.Urgent_Not_Important_Tasks = this.OnGoingTasks.filter(el => el.TaskPriorityID == 2)
        this.Not_Urgent_Important_Tasks = this.OnGoingTasks.filter(el => el.TaskPriorityID == 3)
        this.Not_Urgent_Not_Important_Tasks = this.OnGoingTasks.filter(el => el.TaskPriorityID == 4)
      }
    }
    catch {
      this.OnGoingTasks = []
      this.Urgent_Important_Tasks = []
      this.Urgent_Not_Important_Tasks = []
      this.Not_Urgent_Important_Tasks = []
      this.Not_Urgent_Not_Important_Tasks = []
    }
  }

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
