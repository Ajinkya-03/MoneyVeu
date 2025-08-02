import React, { use, useEffect, useState } from 'react'
import { toast } from "react-toastify"; 
import Header from '../components/Header'
import Cards from '../components/Cards'
import Modal from 'antd/es/modal/Modal';
import AddExpense from '../components/Modals/addExpense';
import AddIncome from '../components/Modals/addIncome';
import moment from "moment";
import { addDoc, collection , query, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import TransactionTable from '../components/TransacTable';

function Dashboard() {
  const [user] = useAuthState(auth)
  const [transaction , setTransactions] = useState([])
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income , setIncome] = useState(0);
  const [expense , setExpense] = useState(0);
  const [balance , setBalance] = useState(0);
  const resetBalance = () => { setBalance(0)};
  
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
  try {
    await addDoc(
      collection(db, `users/${user.uid}/transactions`),
      transaction
    );
    toast.success("Transaction Added!");
    setIsIncomeModalVisible(false);
    setIsExpenseModalVisible(false);
    fetchTransactions(); // Only this is needed!
  } catch (e) {
    toast.error("Couldn't add transaction");
  }
}
   
  useEffect (()=>{
    fetchTransactions();
  } ,[user]);

  useEffect(()=>{
    calculateBalance();

  },[transaction]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transaction.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setBalance(incomeTotal - expensesTotal);
  };

  async function fetchTransactions() {
  if (user) {
    const q = query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
    let transactionsArray = [];
    querySnapshot.forEach((doc) => {
      transactionsArray.push(doc.data());
    });
    setTransactions(transactionsArray);
  }
}

  return (
    <div>
      <Header />
      <Cards
        income={income}
        expense={expense}
        balance={balance} 
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        handleExpenseCancel={handleExpenseCancel}
        handleIncomeCancel={handleIncomeCancel}
        resetBalance={resetBalance}
      />
      <AddExpense
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddIncome
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />

      
      <TransactionTable transaction={transaction}/>

    </div>
  )
}

export default Dashboard