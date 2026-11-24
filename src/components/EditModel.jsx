import "../styles/EditModel.css";
import { useEffect, useState } from "react";

function EditModel({ editId, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    id: editId,
    amount: null,
    description: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expense") || "[]");
    const expense = expenses.find((item) => String(item.id) === String(editId));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (expense) setFormData(expense);
  }, [editId]);

  //Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  //Update expense
  const handleUpdate = (e) => {
    e.preventDefault();

    const expenses = JSON.parse(localStorage.getItem("expense") || "[]");
    const updateExpenses = expenses.map((item) =>
      String(item.id) === String(editId) ? formData : item,
    );
    localStorage.setItem("expense", JSON.stringify(updateExpenses));
    onUpdate();
    onClose();
  };

  return (
    <div className="model">
      <div className="form-box">
        <form onSubmit={handleUpdate}>
          <h1>Edit Expense</h1>

          <input
            type="number"
            name="amount"
            defaultValue=""
            placeholder="Amount"
            value={formData.amount || ""}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            defaultValue=""
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="data"
            defaultValue=""
            value={formData.date}
            onChange={handleChange}
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            defaultValue=""
          >
            <option value="">Select Category</option>
                        <option value="food">Food</option>

            <option value="shopping">shopping</option>
            <option value="transportation">Transportation</option>
            <option value="education">Education</option>
            <option value="phoneBill">Phone Bill</option>
            <option value="entertainment">Entertainment</option>
          </select>

          <div className="model-btn">
            <button className="edit">update</button>
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModel;
