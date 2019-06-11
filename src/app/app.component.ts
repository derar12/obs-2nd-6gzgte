import { Component, OnInit } from '@angular/core';
import { from,} from 'rxjs';
import { map,} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;

  //observa ble
  values: any = [];
  //subscriber
  anyArray: any = [];

  test: any;
  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('quang', [
        Validators.required,
        Validators.minLength(2)]),
      email: new FormControl('email1'),
      age: new FormControl('2', [Validators.required,
      Validators.pattern("^[0-9]*$")])
    });
  }

// this approach adds multi data that becomes an observable and gets subscribed to then added to an array of already subscribed data
  onSubmit(form: FormGroup) {
    this.values.push({ "name": form.value.name, "email": form.value.email, "age": form.value.age });

    form.reset();

    //observor that gets subscribed too 
    const source = from(this.values);

    // x should be a list of observables
    source.subscribe(x => { this.anyArray.push(x) });
    //source.subscribe(x => { this.test = x });
    //source.subscribe(x => { console.log(x) });
    //console.log(this.test);

    //below logs the array of inserted values obj {name : "sds"}
    //source.subscribe(x => console.log(x));
  }

  // this approach adds a single data at a time that gets subscribed to then added to the already subscribed data array
    onSubmit2(form: FormGroup) {
    this.values.push({ "name": form.value.name, "email": form.value.email, "age": form.value.age });
    form.reset();

    //observor that gets subscribed too 
    const source = from(this.values);
    // THIS IS THE DIFFERENCE BETWEEN THE TWO METHODS
    // values is a single object here, instead of an array of multiple objects in the first one 
    this.values = [];
    // x should be a list of observables
    source.subscribe(x => { this.anyArray.push(x) });
  }
  reload() {
    this.anyArray = [];
  }
}