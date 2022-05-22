import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
})
export class TaskFormPage implements OnInit {
  public PageTitle = "Create"
  constructor(private modalController: ModalController) { }
  @Input() TaskObject

  ngOnInit() {
    console.log(this.TaskObject)
    this.PageTitle = (typeof this.TaskObject !== "undefined" && this.TaskObject !== null ) ? "Edit" : "Create"
  }

  async dismissModal() {
    await this.modalController.dismiss({
      // data1: 'yessssss'
    })
  }

}
