import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'


const BASE_API = 'https://dabbackend-production.up.railway.app/'

function App() {

  const [expense, setExpense] = useState('');
  const [info, setInfo] = useState({});
  const [income, setIncome] = useState('');
  const [date, setDate] = useState(undefined);
  const [lastChange, setLastChange] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post(`${BASE_API}expense`, {
      expense
    })
    async function request() {
      const response = await axios.get(`${BASE_API}info`);
      console.log(response.data)
      setInfo(response.data);
    }
    request();
    setExpense('')
    console.log(response.data)
  }


  useEffect(() => {
    async function request() {
      const response = await axios.get(`${BASE_API}info`);
      setInfo(response.data);
      console.log(response.data)
    }
    request();
    setDate(new Date());
    console.log(date)
  }, [])

  function formatDate(my_date) {
    const day = String(my_date.getDate()).padStart(2, '0');
    const month = String(my_date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const year = my_date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  async function handleIncomeSubmit() {

  }


  async function handleUndo() {

    const response = await axios.get(`${BASE_API}change`);
    const reverted_data = response.data;
    // setLastChange(false) 
    console.log(reverted_data)
    setInfo({ ...info, dab: reverted_data.revert.dab, money: reverted_data.revert.money, predicted_dab: reverted_data.revert.predicted_dab, expenses: reverted_data.revert.expenses })
    console.log(info)



  }



  return (
    <div className="app">
      <h1 className='date'>{formatDate(new Date())}</h1>
      <div className="main_info">
        <p className='dl'> Daily Limit for this month: ₹{info.dl}</p>
        <p className="dab">DAB : ₹{info.dab}</p>
        <p className='predicted_dab'>Predicted Dab : ₹{info.predicted_dab}</p>
      </div>
      <div className="forms">
        <form method='POST' onSubmit={(e) => {
          handleSubmit(e)
        }}>
          <input type="number" placeholder='Enter An Expense' name='expense' value={expense} onChange={(e) => { setExpense(e.target.value) }} required />
          <button type="submit" > Enter </button>
        </form>

        <form onSubmit={handleIncomeSubmit} method="post">
          <input type="number" placeholder='Enter An Income' name='income' value={income} onChange={(e) => { setIncome(e.target.value) }} required />
          <button type="submit">Enter</button>
        </form>
      </div>
      <div className="bot_info">
        <p className='savings'>Savings target for this month: ₹{info.savingstarget}</p>
        <p className="money">Money : ₹{info.money}</p>
        <p className='expenses'> Expenses today: ₹{info.expenses}</p>
      </div>


      <button className='undo' onClick={handleUndo}>Undo</button>
    </div>
  )
}

export default App
