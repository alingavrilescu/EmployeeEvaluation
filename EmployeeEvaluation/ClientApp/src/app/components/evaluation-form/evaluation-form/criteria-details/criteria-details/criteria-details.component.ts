import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criteria-details',
  templateUrl: './criteria-details.component.html',
  styleUrls: ['./criteria-details.component.css']
})
export class CriteriaDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
