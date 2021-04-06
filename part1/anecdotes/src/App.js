import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);

  const getRandomAnecdote = () => {
    let randomAnecdote = Math.round(Math.random() * 5);
    setSelected(randomAnecdote);
  };

  const setVote = () => {
    let newVotes = [...votes];
    newVotes[selected] += 1;

    setVotes(newVotes);
  };

  let mostVotes = votes.reduce(
    (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
    0
  );

  return (
    <>
      <h1>Anectode of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={setVote}>vote</button>
      <button onClick={getRandomAnecdote}>next anecdote</button>
      <h1>Anectode with most votes</h1>
      <div>{anecdotes[mostVotes]}</div>
      <div>has {votes[mostVotes]} votes</div>
    </>
  );
};

export default App;
