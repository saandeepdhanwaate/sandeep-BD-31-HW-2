const express = require("express");
const app = express();
const port = 3000;

let cartItems = [
  { item: "Book", price: 30 },
  { item: "Pen", price: 5 },
  { item: "Notebook", price: 50 },
  { item: "Bag", price: 125 },
];

let students = [
  { name: "John", grade: "A" },
  { name: "Jane", grade: "A" },
  { name: "Jack", grade: "B" },
  { name: "Jill", grade: "C" },
];

let temperatures = [0, 20, 30, 100];

let student_scores = [
  { name: "John", score: 85 },
  { name: "Jane", score: 90 },
  { name: "Jack", score: 70 },
  { name: "Jill", score: 60 },
];

let sentences = "The quick brown fox jumps over the lazy dog";

// cart/total
function calculateTotalPrice(cartItems) {
  let item = 0;
  for (let i = 0; i < cartItems.length; i++) {
    item += cartItems[i].price;
  }
  return item;
}

app.get("/cart/total", (req, res) => {
  let result = calculateTotalPrice(cartItems);
  res.json({ totalprice: result });
});

// students/filter
function filterStudentsByGrade(students, grade) {
  let result = [];
  for (let i = 0; i < students.length; i++) {
    if (students[i].grade === grade) {
      result.push(students[i]);
    }
  }
  return result;
}
app.get("/students/filter", (req, res) => {
  let grade = req.query.grade;
  let result = filterStudentsByGrade(students, grade);
  res.json({ students: result });
});

// temperatures/convert
function convertCelsiusToFahrenheit(temperatures, covertTemp) {
  let result = [];
  for (let i = 0; i < temperatures.length; i++) {
    if (covertTemp === "C") {
      result.push((temperatures[i] * 9) / 5 + 32);
    } else {
      result.push(((temperatures[i] - 32) * 5) / 9);
    }
  }
  return result;
}
app.get("/temperatures/convert", (req, res) => {
  let covertTemp = req.query.covertTemp;
  let result = convertCelsiusToFahrenheit(temperatures, covertTemp);
  res.json({ temperatures: result });
});

// students/average-score
function calculateAverageScore(student_scores) {
  // calculates the average score of students.
  let sum = 0;
  for (let i = 0; i < student_scores.length; i++) {
    sum += student_scores[i].score / student_scores.length;
  }
  return sum;
}
app.get("/students/average-score", (req, res) => {
  let result = calculateAverageScore(student_scores);
  res.json({ averageScore: result });
});

// sentence/count-words
function countWords(sentenses) {
  return sentences.split(" ").length;
}
app.get("/sentence/count-words", (req, res) => {
  let result = countWords(sentences);
  res.json({ wordCount: result });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
