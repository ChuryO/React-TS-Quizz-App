import React from "react";
import {Wrapper,ButtonWrapper} from "./QuestionCard.styles";
import {AnswerType} from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerType | undefined;
  questionNum: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNum, totalQuestions}) => (
  <Wrapper>
    <p className='number'>
      Question: {questionNum} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{__html: question}}/>
    <div>
      {answers && answers.map(answer => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html: answer}}/>
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;