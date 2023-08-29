let currentQuestionId = 1;
let score = 0;

function getQuestion(id) {
  fetch(`/api/question/${id}`)
    .then(response => response.json())
    .then(question => {
      document.getElementById('quiz-container').innerHTML = `
        <p>${question.question}</p>
        <input type="radio" name="answer" value="1">${question.answer1}<br>
        <input type="radio" name="answer" value="2">${question.answer2}<br>
        <input type="radio" name="answer" value="3">${question.answer3}<br>
        <input type="radio" name="answer" value="4">${question.answer4}<br>
        <button onclick="submitAnswer()">Submit</button>
      `;
    });
}

function submitAnswer() {
  let answer = document.querySelector('input[name="answer"]:checked').value;
  fetch('/api/answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({questionId: currentQuestionId, answer: answer}),
  })
    .then(response => response.json())
    .then(data => {
      if (data.correct) {
        score++;
      }
      currentQuestionId++;
    });
}

function getNextQuestion() {
  if (currentQuestionId <= 10) {
    getQuestion(currentQuestionId);
  } else {
    document.getElementById('quiz-container').innerHTML = `<p>Your score: ${score}/10</p>`;
    document.getElementById('next-button').style.display = 'none';
  }
}

// Start the quiz
getNextQuestion();
