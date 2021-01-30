import React, {useState} from 'react';
import {Difficulty, fetchQuizQuestions, QuestionStateType} from "./API";
import QuestionCard from "./components/QuestionCard";
import {GlobalStyle, Wrapper} from "./App.styles";

export type AnswerType = {
  question: string;
  answer: string;
  isAnswerCorrect: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionStateType[]>([]);
  const [step, setStep] = useState(0);
  const [userAnswers, setUserAnswer] = useState<AnswerType[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setStep(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const isAnswerCorrect = questions[step].correct_answer === answer
      if (isAnswerCorrect) {
        setScore(score => score + 1)
      }
      const answerObject = {
        answer,
        isAnswerCorrect,
        question: questions[step].question,
        correctAnswer: questions[step].correct_answer
      }
      setUserAnswer(prevState => [
        ...prevState,
        answerObject
      ]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = step + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setStep(step => step + 1)
    }
  }

  return (
    <>
      <GlobalStyle/>
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS
          ? <button className="start" onClick={startTrivia}>Start</button>
          : null}
        {!gameOver && <p className='score'>Score: {score}</p>}
        {loading && <p className='loading'>Loading Question...</p>}
        {!loading
        && !gameOver
        && <QuestionCard
            questionNum={step + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[step].question}
            answers={questions[step].answers}
            userAnswer={userAnswers ? userAnswers[step] : undefined}
            callback={checkAnswer}
        />}
        {!loading
        && userAnswers.length === step + 1
        && step !== TOTAL_QUESTIONS - 1
        && <button className='next' onClick={nextQuestion}>Next Question</button>}
      </Wrapper>
    </>
  );
}

export default App;
