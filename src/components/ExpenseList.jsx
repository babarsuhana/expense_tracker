import { useEffect, useState } from "react";
import "../styles/ExpenseList.css";
import ConfirmationModal from "./ConfirmationModal";
import EditModel from "./EditModel";
import { useNavigate } from "react-router-dom";
function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [deleteExpense, setDeleteExpense] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openModel, setOpenModel] = useState(null);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const loadExpenses = () => {
    const savedExpense = JSON.parse(localStorage.getItem("expense") || "[]");
    setExpenses(savedExpense);
  };

  useEffect(() => {
    //safe: we only read lovcalstorage on mount
    //eslint-disable-next-line react-hooks/set-state-in-effect
    loadExpenses();
  }, []);

  const totalAmount = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  //Filterd expenses
  const filteredExpenses = expenses.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter;
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  //Handlers
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //Delete expense
  const handleDelete = (id) => {
    const updateExpenses = expenses.filter((item) => item.id !== id);

    localStorage.setItem("expense", JSON.stringify(updateExpenses));

    setExpenses(updateExpenses);
    setDeleteExpense(null);
  };

  const editHandler = (id) => {
    setEditId(id);
    setOpenModel(true);
  };

  //Read More handler
  const handleReadMore = (id) => {
    navigate(`/expenseDetails/${id}`);
  };

  return (
    <>
      <div className="ExpenseList">
        <div className="list-search">
          <div>
            <h1>your expense</h1>
            <p className="list-help">
              search,edits, or remove an expense below .
            </p>
          </div>
          <div>
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">All categories</option>
              <option value="food">Food</option>
              <option value="travl">Travel</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
            </select>

            <input
              type="search"
              placeholder="Search expense..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td className="table-action">
                    <button
                      type="button"
                      className="btn-delete"
                      onClick={() => setDeleteExpense(expense)}
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => editHandler(expense.id)}
                      className="btn-edit"
                    >
                      Edit
                    </button>

                    <button
                      className="btn-readmore"
                      onClick={() => handleReadMore(expense.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-data">
                  No result Found
                </td>
              </tr>
            )}

            <tr className="expense-total">
              <td colSpan={5}>Total:{totalAmount} </td>
            </tr>
          </tbody>
        </table>
      </div>
      {deleteExpense !== null && (
        <ConfirmationModal
          title="delete Expense"
          message={"Are you sure want to delete this expense"}
          confirmText="Delete"
          cancelText="Cancel"
          onCancel={() => setDeleteExpense(null)}
          onConfirm={() => handleDelete(deleteExpense.id)}
        />
      )}
      {openModel && editId !== null && (
        <EditModel
          editId={editId}
          onClose={() => setOpenModel(false)}
          onUpdate={loadExpenses}
        />
      )}
    </>
  );
}

export default ExpenseList;
