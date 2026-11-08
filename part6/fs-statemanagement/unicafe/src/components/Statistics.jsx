const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  /* if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }
 */
  return (
    <div>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={`${positive} %`} />
    </div>
  );
};

export default Statistics;
