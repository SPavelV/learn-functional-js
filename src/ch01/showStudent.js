import { run } from './magic-run';

function showStudent(ssn) {
  let student = db.find(ssn);
  if(student !== null) {
    document.querySelector(`#${elementId}`).innerHTML = 
    `
      ${student.ssn},
      ${student.firstName},
      ${student.lastName};
    `
  } else {
    throw new Error('Student not found!');
  }
}

showStudent('444-44-4444');

const find = curry((db, id) => {
  let obj = db.find(id);
  if(obj === null) {
    throw new Error('Object not found!');
  }
  return obj;
});

const csv = student =>  `${student.ssn}, ${student.firstname}, ${student.lastName};`

const append = curry((selector, info)=> {
  document.querySelector(selector).innerHTML = info;
})

const showStudentDeclarative = run(append('#student-info'), csv, find(db));

showStudentDeclarative('4444-44-4444');

