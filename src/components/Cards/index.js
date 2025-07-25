import React from 'react'
import { Card, Col, Row } from 'antd';
import "./style.css";
import Button from '../Button';

function Cards({showExpenseModal,showIncomeModal}) {
  return (
        <div>
            <Row className="my-row">
                <Card className="my-card" title="Current Balance">
                 <p>₹0</p>
                 <h4><Button text="Reset Balance" black={true} /></h4>
                </Card>

                <Card className="my-card" title="Total Income">
                 <p>₹0</p>
                 <h4><Button text="Add Income" black={true} OnClick={showIncomeModal}/></h4>
                </Card>

                <Card className="my-card" title="Total Expense">
                 <p>₹0</p>
                 <h4><Button text="Add Expense" black={true} OnClick={showExpenseModal}/></h4>
                </Card>

            </Row>
        </div>
  )
}

export default Cards