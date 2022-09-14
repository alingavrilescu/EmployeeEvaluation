import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})

export class FormTemplateComponent implements OnInit {

  public dataFields: Object ={text:'Type', value:'id'};
  public  localData:Object[] =[
    {Id:'1',Type:'Junior'},
    {Id:'2',Type:'Intermediate'},
    {Id:'3',Type:'Senior'},
    {Id:'4',Type:'Expert'},
  ];
  constructor() { }

  ngOnInit(): void {
  }
  
 

}
