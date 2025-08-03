import React from 'react'
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';

function Chart({sortedTranscation}) {

  const data = sortedTranscation.map((item) => ({
  date: item.date,
  amount: item.amount,
}));

const spendingDataArray = sortedTranscation
  .filter((item) => item.type === "expense")
  .map((item) => ({ tag: item.tag, amount: item.amount }));

const config = {
  data,
  xField: 'date',
  yField: 'amount',
};

const spending_config = {
  data: spendingDataArray,
  angleField: "amount",
  colorField: "tag",
};

return (
  <>
    <div style={{ display: "flex", width: "100%" }}>
    <div style={{ width: "50%", margin: "0", marginLeft: "25px" , marginBottom: "50px" }}>
      <h2 style={{ marginLeft: "55px" }}>Your Transactions</h2>
      <Line {...config} />
    </div>
    <div style={{ width: "50%", margin: "0", marginLeft: "25px" , marginBottom: "50px" }}>
      <h2>Total Spending</h2>
      {spendingDataArray.length === 0 ? (
        <p>Seems like you haven't spent anything till now...</p>
      ) : (
        <Pie {...spending_config} />
      )}
    </div>
  </div>
  </>
);
}

export default Chart