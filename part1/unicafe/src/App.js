import React, { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => {
  if (text === "percent") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const percent = (good / total) * 100;

  if (total === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    );
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average.toFixed(1)} />
          <Statistic text="percent" value={percent.toFixed(1)} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodPlus = () => setGood(good + 1);
  const neutralPlus = () => setNeutral(neutral + 1);
  const badPlus = () => setBad(bad + 1);

  return (
    <>
      <h1>give feedback</h1>

      <Button text="good" handleClick={goodPlus} />
      <Button text="neutral" handleClick={neutralPlus} />
      <Button text="bad" handleClick={badPlus} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
