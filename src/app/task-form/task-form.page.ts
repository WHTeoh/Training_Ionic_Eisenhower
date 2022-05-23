import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';

interface TaskForm {
  TaskID: number,
  TaskName: string,
  Notes: string,
  PriorityType: any,

  Invalid_TaskName: boolean,
  Invalid_Priority: boolean,
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})

export class TaskFormPage implements OnInit {
  @Input() TaskObject

  public PageTitle = "Create";
  public PriorityTypes: any = []
  public form: TaskForm = {
    TaskID: null,
    TaskName: '',
    Notes: '',
    PriorityType: null,

    Invalid_TaskName: null,
    Invalid_Priority: null,
  }
  public isInValid: boolean = true

  constructor(
    private modalController: ModalController,
    private dataProvider: DataProviderService,

  ) { }


  ngOnInit() {
    this.PageTitle = (typeof this.TaskObject !== "undefined" && this.TaskObject !== null) ? "Edit" : "Create"
    this.requestFetchPriorityTypes();
  }

  async requestFetchPriorityTypes() {
    const resp: any = await this.dataProvider.ViewTaskPriorityTypes()
    // we may have to parse the return results with JSON.parse(resp) 
    // if we are using other method to return JSON results from API
    // in PHP, the JSON is returned as JSON object perfectly, 
    // we doesn't need to do anything once we got the data
    if (resp.ReturnValue === 1)
      this.PriorityTypes = resp.Result && resp.Result.length > 0 ? resp.Result : []
    else
      this.PriorityTypes = []
  }

  FormValidator(formEl, value) {
    // check task name is empty
    if(formEl === "TaskName")
      this.form.Invalid_TaskName = (typeof value === "string" && value.trim() !== "") ? false : true

    // check task priority is empty
    if(formEl === "PriorityType")
      this.form.Invalid_Priority = (typeof value !== "undefined" && value !== null && !isNaN(value)) ? false : true

    if (!this.form.Invalid_TaskName && !this.form.Invalid_Priority)
      this.isInValid = false
    else
      this.isInValid = true
  }

  async submitForm() {
    // define submission parameters for validation before calling the API
    let object = {
      TASKNAME: this.form.TaskName,
      NOTES: this.form.Notes,
      PRIORTYTYPE: this.form.PriorityType
    }

    if (!this.isInValid) {
      object.NOTES = object.NOTES !== "" && object.NOTES.trim() !== "" ? object.NOTES : "-"
      const resp = await this.dataProvider.Tasks_CreateTask(object.TASKNAME, object.NOTES, object.PRIORTYTYPE)
      console.log(resp)

      
    }
  }

  async dismissModal() {
    await this.modalController.dismiss({
      // data1: 'yessssss'
    })
  }

}
