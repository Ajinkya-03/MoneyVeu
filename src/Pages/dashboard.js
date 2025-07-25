import React, { useEffect, useState } from 'react'
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

function Dashboard() {
  const [user] = useAuthState(auth)
  const [transaction , setTransactions] = useState([])
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  
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
    } catch (e) {
      toast.error("Couldn't add transaction");
    }
  }
   
  useEffect (()=>{
    fetchTransactions();
  } ,[]);


  async function fetchTransactions() {
  if (user) {
    const q = query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
    let transactionsArray = [];
    querySnapshot.forEach((doc) => {
      transactionsArray.push(doc.data());
    });
    setTransactions(transactionsArray);
    toast.success("Transactions Fetched!");
  }
}

  return (
    <div>
      <Header />
      <Cards 
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        handleExpenseCancel={handleExpenseCancel}
        handleIncomeCancel={handleIncomeCancel}
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
    </div>
  )
}

export default Dashboard