import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private apiUrl = "https://overturecode.000webhostapp.com/";

  constructor(
    private http: HttpClient
  ) { }

  ViewTaskPriorityTypes() {
    return new Promise((resolve) => {
      this.http
        .get(this.apiUrl + "TaskManager/ViewTaskPriorityTypes.php")
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            resolve([]);
          }
        );
    });
  }

  Tasks_ViewAllTasks() {
    return new Promise((resolve) => {
      this.http
        .get(this.apiUrl + "TaskManager/Tasks_ViewAllTasks.php")
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            resolve([]);
          }
        );
    });
  }

  Tasks_CreateTask(TASKNAME, NOTES, PRIORTYTYPE) {
    return new Promise((resolve) => {
      this.http
        .get(this.apiUrl + "TaskManager/Tasks_CreateTask.php?TASKNAME=" + TASKNAME + "&NOTES=" + NOTES + "&PRIORTYTYPE=" + PRIORTYTYPE)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            resolve([]);
          }
        );
    });
  }

}
