import { useEffect, useState } from "react";
import "../styles/ExpenseList.css";
import ConfirmationModal from "./ConfirmationModal";
import EditModel from "./EditModel";
function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [deleteExpense, setDeleteExpense] = useState(null);
  const [openModel,setOpenModel]=useState(null);
  const [editId,setEditId]=useState(null);

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
  //Delete expense
  const handleDelete = (id) => {
    const updateExpenses = expenses.filter((item) => item.id !== id);

    localStorage.setItem("expense", JSON.stringify(updateExpenses));

    setExpenses(updateExpenses);
    setDeleteExpense(null);
  };

  const editHandler=(id) => {
    setEditId(id);
    setOpenModel(true);
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
            <select>
              <option>All categories</option>
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Entertainment</option>
            </select>

            <input type="search" placeholder="Search expense..." />
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
            {expenses.length > 0 ? (
              expenses.map((expense) => (
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

                    <butoon
                    onClick={() => editHandler(expense.id)}
                    className="btn-edit">
                        Edit
                        </butoon>

                    <butoon className="btn-readmore">View</butoon>
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
      {openModel && editId !==null &&(
        <EditModel/>      
        )}
    </>
  );
}

export default ExpenseList;
