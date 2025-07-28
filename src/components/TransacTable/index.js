import React, { useState } from 'react'
import "./style.css";
import { Select, Table } from 'antd';

function TransactionTable({transaction}) {
  const { Option } = Select;
  const [search , setSearch] = useState("");
  const [typeFilter , setTypeFilter] = useState("")

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

  let filterTransaction = transaction.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()) 
                          && item.type.includes(typeFilter));

  return (
          <>
    <div className="filter-bar">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search by name"
      />
      <Select
        className="select-input"
        onChange={(value) => setTypeFilter(value)}
        value={typeFilter}
        placeholder="Filter"
        allowClear
        style={{ minWidth: 120 }}
      >
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
      </Select>
    </div>
    <Table className="tt" dataSource={filterTransaction} columns={columns} />
  </>
  )
}

export default TransactionTable