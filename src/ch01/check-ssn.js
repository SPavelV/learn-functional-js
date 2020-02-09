// imperative decision
let valid = false;
const elem = document.querySelector('#student-ssn');

elem.onkeyup = function(event) {
  let val = elem.nodeValue;
  if(val !== null && val.length !== 0) {
    val = val.replace(/^\s*|\s*$|\-/g, '');
    if(val.length === 9) {
      console.log(`Valid SSN: ${val}!`);
      valid = true;
    }
  }
  else {
    console.log(`Invalid SSN: ${val}!`);
    
  }
}

// declarative decision
Rx.Observable.fromEvent(document.querySelector('#student-ssn'), 'keyup')
  .map(input => input.srcElement.value)
  .filter(ssn => ssn !== null && ssn.length !== 0)
  .map(ssn => ssn.replace(/^\s*|\s*$|\-/g, ''))
  .skipWhile(ssn => ssn.length !== 9)
  .subscribe(
    validSsn => console.log(`Valid SSN ${validSsn}`)
  );