import "../styles/ExpenseForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseForm() {
    const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" && value !== "" ? Number(value) : value,
    }));
  };
  const validate = () => {
    const newErrors = {};

    if (!formdata.amount || formdata.amount <= 0) {
      newErrors.amount = "Enter an amount greater than 0";
    }
    if (!formdata.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formdata.date) {
      newErrors.date = "Data is required";
    }
    if (!formdata.category) {
      newErrors.category = "select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const expense = JSON.parse(localStorage.getItem('expense') || '[]');
    const newExpense = { ...formdata, id: uuidv4() };


    localStorage.setItem('expense', JSON.stringify([...expense, newExpense]));
    navigate("/");
  };
  return (
    <div className="expenseform">
      <form onSubmit={handleSubmit}>
        <h1>Expense Form</h1>



        <input
          type="number"
          name="amount"
          placeholder="Enter amount.."
          value={formdata.amount}
          onChange={handleChange}
        />
        {errors.amount && <p className="validation">{errors.description}</p>}

        <input
          type="text"
          name="description"
          placeholder="Enter Description.."
          value={formdata.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="validation">{errors.description}</p>
        )}

        <input
          type="date"
          name="date"
          placeholder="Enter Date.."
          value={formdata.date}
          onChange={handleChange}
        />
        {errors.date && <p className="validation">{errors.date}</p>}
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formdata.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="transportation">Transportation</option>
          <option value="education">Education</option>
          <option value="phoneBill">Phone Bill</option>
          <option value="entertainment">Entertainment</option>
        </select>
        {errors.category && <p className="validation">{errors.category}</p>}
        <div className="btn">
          <button>Add Expense</button>
        </div>
      </form>
    </div>
  );
}
