import "../styles/EditModel.css";

function EditModel() {
  return (
    <div className="model">
        <div className="form-box">
            <form>
                <h1>Edit Expense</h1>

                <input
                    type="number"
                    name="amount"
                    defaultValue=""
                    placeholder="Amount"
              />

              <input
                    type="text"
                    name="description"
                    defaultValue=""
                    placeholder="DEscription"
              />

              <input type="date" name="data" defaultValue=""/>

              <label htmlFor="category">Category</label>
              <select id="category" name="cateory" defaultValue="">
                <option value="">Select Category</option>
                <option value="shopping">shopping</option>
                <option value="shopping">Transportation</option>
                <option value="shopping">Education</option>
                <option value="shopping">Phone Bill</option>
                <option value="shopping">Entertainment</option>
              </select>

              <div className="model-btn">
                <button type="button" className="edit">
                    update
                </button>
                <button type="button" className="cancel">
                    Cancel
                </button>
              </div>
            </form>
        </div>
    </div>

      
    
  )
}

export default EditModel
