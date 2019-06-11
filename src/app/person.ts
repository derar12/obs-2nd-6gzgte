import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

export interface Person {
  name: string;
  address: string;

}

export function makePerson(person?: Person) {
  // if person exists ... return person otherwise set default values
  return !!person ? {...person} : {name: 'as asd as', address: ''};
}

export function makePersonFormGroup(person?: Person): FormGroup {
  const p = makePerson(person);
  let newG = new FormBuilder().group({

    name: [p.name, [Validators.required,Validators.minLength(5),fullName]],
    // can use Validators.email, Validators.pattern() or custom validator

    address: [p.address, [Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    /*
    password: [p.password, [Validators.required,Validators.minLength(5)]],
    passwordCheck: [p.passwordCheck, [Validators.required,Validators.minLength(5),fullName]]*/
  })
  return newG;
  }

// validators typically return nothing/null if it passes. otherwises it returns something back to signal there is an error
function fullName(input: FormControl) {
  const isFull = input.value.indexOf(' ') >= 0;
  return isFull ? null : { notFull: true };
}

function emailValid(input: FormControl) {
   let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regexp.test(input.value) ? null :{notValid:true};
}
