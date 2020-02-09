const arr = [80, 90, 100];
const sum = (total, current) => total + current;
const total = arr => arr.reduce(sum);
const size = arr => arr.length;
const divide = (a, b) => a / b;
const average = arr => divide(total(arr), size(arr));
console.log(average(arr));

let enrollment = [
  {enrolled: 2, grade: 100},
  {enrolled: 2, grade: 80},
  {enrolled: 1, grade: 89}
];

let totalGrades = 0;
let totalStudentFound = 0;

for (let index = 0; index < enrollment.length; index++) {
  const student = enrollment[index];
  if (student !== null) {
    if(student.enrolled > 1) {
      totalGrades+= student.grade;
      totalStudentFound++;
    }
  }
}

let averageStudent = totalGrades / totalStudentFound;
console.log('averageStudent: ', averageStudent);


