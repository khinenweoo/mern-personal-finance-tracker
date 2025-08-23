import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import toast from 'react-hot-toast';

export const FinancialRecordForm: React.FC<{ onCancel: () => void; }> = ({ onCancel }) => {

  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { user } = useUser();
  const { addRecord } = useFinancialRecords();
  const [selectedType, setSelectedType] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let transaction = 0;

    if (selectedType == "") {
      toast.error("Please choose the Type.");
      return;
    }

    if (selectedType === 'expenses') {
      transaction = -amount;
    } else {
      transaction = +amount;
    }

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: transaction,
      category: category,
      type: selectedType,
      paymentMethod: paymentMethod,
    };

    addRecord(newRecord);

    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  }

  return (
    <div className="form-container">
      <h1 className="text-gray-950 text-lg font-semibold font-sans mb-5">Add New Entry</h1>
      <form onSubmit={handleSubmit} >
        <div className="form-field">
          <label className="text-gray-900 font-semibold font-sans text-sm leading-tight tracking-normal">Type</label>
          <div className="flex gap-2 space-x-2 mb-3 mt-2" role="radio-group">
            <div className="flex items-center me-4">
                <input 
                type="radio" 
                value="income"
                checked={selectedType === 'income'} 
                onChange={handleChange}
                name="inline-radio-group" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900">Income</label>
            </div>
            <div className="flex items-center me-4">
                <input 
                  type="radio" 
                  value="expenses"
                  checked={selectedType === 'expenses'}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                />
                <label className="ms-2 text-sm font-medium text-gray-900">Expenses</label>
            </div>
          </div>
        </div>

        <div className="form-field">
          <label className="text-gray-900 font-semibold font-sans text-sm leading-tight tracking-normal">Amount</label>
          <input
            type="number"
            required
            className="input mb-3 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="text-gray-900 font-semibold font-sans text-sm leading-tight tracking-normal">Description</label>
          <input
            type="text"
            required
            className="input mb-3 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* <div className="form-field">
          <label className="text-gray-800 text-sm leading-tight tracking-normal">Date</label>
          <div className="relative mb-5 mt-2">
            <div className="absolute left-3 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
              <i className='bx bx-calendar text-xl'></i>
            </div>
            <input id="expiry" className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-10 text-sm border-gray-300 rounded border" placeholder="MM/YY" />
          </div>
        </div> */}
        <div className="form-field">
          <label className="text-gray-900 font-semibold font-sans text-sm leading-tight tracking-normal">Category:</label>
          <div className="relative">
            <select
              required
              className="input mb-3 mt-2"
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
          <label className="text-gray-900 font-semibold font-sans text-sm leading-tight tracking-normal">Payment Method:</label>
          <div className="relative">
            <select
              required
              className="input mb-3 mt-2"
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
        <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
          <button type="button" onClick={onCancel} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
            Cancel
          </button>

          <button type="submit" className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
            Add Entry
          </button>
        </div>
      </form>
    </div>
  );
}