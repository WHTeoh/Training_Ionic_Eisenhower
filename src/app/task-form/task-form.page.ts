import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit {
  // class variables
  public PageTitle = "Create";
  public PriorityTypes: any = []

  constructor(
    private modalController: ModalController,
    private dataProvider: DataProviderService,

  ) { }

  @Input() TaskObject

  ngOnInit() {
    console.log(this.TaskObject)
    this.PageTitle = (typeof this.TaskObject !== "undefined" && this.TaskObject !== null) ? "Edit" : "Create"

    this.requestFetchPriorityTypes();
  }

  async requestFetchPriorityTypes() {
    const resp = await this.dataProvider.ViewTaskPriorityTypes()
    // we may have to parse the return results with JSON.parse(resp) 
    // if we are using other method to return JSON results from API
    // in PHP, the JSON is returned as JSON object perfectly, 
    // we doesn't need to do anything once we got the data
    this.PriorityTypes = resp 
    console.log(this.PriorityTypes)
  }

  async dismissModal() {
    await this.modalController.dismiss({
      // data1: 'yessssss'
    })
  }

}
