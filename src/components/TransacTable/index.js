import React from 'react'
import "./style.css";
import { Table } from 'antd';

function TransactionTable({transaction}) {

    const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
];

  return (
    <Table dataSource={transaction} columns={columns} />
  )
}

export default TransactionTable