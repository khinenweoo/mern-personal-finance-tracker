import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = () => {

  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { user } = useUser();
  const { addRecord } = useFinancialRecords();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: parseFloat(amount),
      category: category,
      paymentMethod: paymentMethod,
    };

    addRecord(newRecord);

    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="form-container">
      <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Add New Expense</h1>
      <form onSubmit={handleSubmit} >
        <div className="form-field">
          <label className="text-gray-800 text-sm leading-tight tracking-normal">Amount</label>
          <input
            type="number"
            required
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="text-gray-800 text-sm leading-tight tracking-normal">Description</label>
          <input
            type="text"
            required
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="text-gray-800 text-sm leading-tight tracking-normal">Date</label>
          <div className="relative mb-5 mt-2">
            <div className="absolute left-3 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
              <i className='bx bx-calendar text-xl'></i>
            </div>
            <input id="expiry" className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-10 text-sm border-gray-300 rounded border" placeholder="MM/YY" />
          </div>
        </div>
        <div className="form-field">
          <label className="text-gray-800 text-sm leading-tight tracking-normal">Category:</label>
          <div className="relative mb-5 mt-2">
            <select
              required
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Transportation">Transportation</option>
              <option value="Health">Health</option>
              <option value="Groceries">Groceries</option>
              <option value="Education">Education</option>
              <option value="Rent">Rent</option>
              <option value="Housing">Housing</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-field">
          <label className="text-gray-800 text-sm leading-tight tracking-normal">Payment Method:</label>
          <div className="relative mb-5 mt-2">
            <select
              required
              className="input"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select a Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Mobile Banking">Mobile Banking</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out hover:bg-indigo-500 bg-indigo-400 rounded text-white px-8 py-2 text-sm"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}