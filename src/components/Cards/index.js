import React from 'react'
import { Card, Col, Row } from 'antd';
import "./style.css";
import Button from '../Button';

function Cards({ income, expense, balance, showExpenseModal, showIncomeModal, resetBalance }) {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balance">
          <p>₹{Number(balance) || 0}</p>
          <h4>
            <Button text="Reset Balance" black={true} OnClick={resetBalance} />
          </h4>
        </Card>

          <Card className="my-card" title="Total Income">
            <p>₹{Number(income) || 0}</p>
            <h4><Button text="Add Income" black={true} OnClick={showIncomeModal} /></h4>
          </Card>

          <Card className="my-card" title="Total Expense">
            <p>₹{Number(expense) || 0}</p>
            <h4><Button text="Add Expense" black={true} OnClick={showExpenseModal} /></h4>
          </Card>
        </Row>
    </div>
  )
}

export default Cards