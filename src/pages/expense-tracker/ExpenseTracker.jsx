import React, { useState } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransaction';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDeleteTransaction } from '../../hooks/useDeleteTransaction';
import { ConfirmBox } from '../../components/ConfirmBox';

const ExpenseTracker = () => {
  const navigate = useNavigate();
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransactions();
  const { name, profilePhoto, isAuth } = useGetUserInfo();
  const { deleteTransaction } = useDeleteTransaction();
  
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const {balance, income, expense} = transactionTotal;

  const [dialog, setDialog] = useState({
    message: "",
    isLoad: false,
  });
  const [id, setID] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!transactionType){
      alert("Please select either Expense or Income");
    }
    else{
      addTransaction({
        description, 
        transactionAmount, 
        transactionType});
      setDescription("");
      setTransactionAmount("");
      setTransactionType("");
    }
  }

  const signUserOut = async() => {
    try{
      await signOut(auth);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  const handleDelete = async (id, description) => {
    setDialog({
      message: `Are you sure you want to delete Transaction: ${description}`,
      isLoad: true,
    })
    setID(id);
  }
  
  const onCancel = () => {
    setDialog({
      message: '',
      isLoad: false,
    });
  };

  const onConfirm = async () => {
    await deleteTransaction(id);
    setDialog({
      message: '',
      isLoad: false,
    });
  }


  return (
    <>
      <div className={`min-h-screen bg-[#DDD0C8] text-lg flex flex-col items-center justify-center z-0 ${dialog.isLoad ? 'opacity-60': 'opacity-100'}`}>
      <div className='TOP-SECTION flex flex-row justify-evenly'>
        <div className='LEFT-TOP SECTION flex flex-col'>
          <p className='font-bold text-4xl py-[5%]'> {name}'s Expense Tracker</p>
          <div className='font-bold text-xl'>
            <p>Your Balance</p>
            <p className='pt-[2%]'>
              {
                balance >= 0 ? 
                <span>${balance}</span> : 
                <span>-${balance * -1}</span>
              }
            </p>
          </div>
          <div>
            <p className='pt-[2%]'>Income</p>
            <p className='pt-[2%]'>${income}</p>
            <p className='pt-[2%]'>Expenses</p>
            <p className='pt-[2%]'>${expense}</p>
          </div>
          <form onSubmit={onSubmit} className='pt-[4%] pb-[5%]'>
            <div className='flex flex-col gap-2'>
              <input
              className='outline-none rounded-md pl-2 py-1 w-[50%]' 
              type='text'
              value={description} 
              placeholder='Description' required 
              onChange={(e) => setDescription(e.target.value)} />
              <input 
              className='outline-none rounded-md pl-2 py-1 w-[50%]'
              type='number' 
              value={transactionAmount}
              placeholder='Amount' required 
              onChange={(e) => setTransactionAmount(e.target.value)} />
            </div>
            <div className='flex justify-start items-start pt-[2%] gap-4'>
              <div>
                <input 
                  type='radio' 
                  value='Expense' 
                  checked={transactionType === "Expense"} 
                  onChange={(e) => setTransactionType(e.target.value)} />
                <label htmlFor='Expense' className='pl-2'>Expense</label>
              </div>
              <div>
                <input 
                  type='radio' 
                  value='Income' 
                  checked={transactionType === "Income"}  
                  onChange={(e) => setTransactionType(e.target.value)} />
                <label htmlFor='Income' className='pl-2'>Income</label>
              </div>
            </div>
            <button className='mt-4 bg-[#323232] text-white px-4 py-1 rounded-lg hover:bg-[#252525] hover:text-[#EEEEEE]'>Add Transaction</button>
          </form>
        </div>
        
        <div className='RIGHT-TOP SECTION flex flex-col items-center justify-center gap-[5%]'>
          <img className='rounded-full w-30 h-30' src={profilePhoto} alt='Profile Image'></img>
          <button className='bg-[#323232] text-white px-4 py-1 rounded-lg hover:bg-[#252525] hover:text-[#EEEEEE]' onClick={signUserOut}>Sign Out</button>
        </div>
      </div>
      <div className='BOTTOM-SECTION w-full flex justify-center pb-[5%] overflow-auto'>
        <div className='border-2 border-black flex-col flex justify-center items-center w-[50%]'>
          <p className='font-bold text-xl pt-[2%] underline'>Transactions</p>
          <ul className='pb-[2%] flex-col items-center justify-center text-center w-full'>
            {transactions.map((transaction, index) => {
              const { description, transactionAmount, transactionType } = transaction;
              return (
                <li key={index} className='pt-[2%] flex items-center'>
                  <button className='text-red-500 left-5 relative' onClick={() => handleDelete(transaction.id, description)}>X</button>
                  <p className='mx-auto'>{description} • ${transactionAmount} ({transactionType})</p>
                </li>
              );
            })}
          </ul>
        </div>
        
      </div>
    </div>
    <div className='w-[50%] h-[50%]'>
      {dialog.isLoad && <ConfirmBox message={dialog.message} onCancel={onCancel} onConfirm={onConfirm}/>}
    </div>
    
    </>
    
  );
  
}

export default ExpenseTracker
