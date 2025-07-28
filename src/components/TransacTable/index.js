import React, { useState } from 'react'
import "./style.css";
import { Select, Table } from 'antd';
import { FaSearch } from "react-icons/fa";
import { unparse, parse } from "papaparse";

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

    function exportToCsv() {
      const csv = unparse(transaction, {
        fields: ["name", "type", "date", "amount", "tag"],
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

  let filterTransaction = transaction.filter((item)=>item.tag.toLowerCase().includes(search.toLowerCase()) 
                          && item.type.includes(typeFilter));

  return (
          <>
    <div className="filter-bar-outer">
      <div className="filter-bar-center">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search by Tag"
            className="search-input"
          />
        </div>
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
      <button onClick={exportToCsv} className="import-csv-btn">Export to CSV</button>
    </div>
    <Table className="tt" dataSource={filterTransaction} columns={columns} />
  </>
  )
}

export default TransactionTable