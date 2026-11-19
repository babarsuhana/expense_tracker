import Navbar  from "../components/Navbar";
import ExpenseList from "../components/ExpenseList";

function Homepage(){
    const expense = [
  
  {
    amount: "₹2,000",
    shopping: "Grocery shopping",
    date: "17 Nov 2026",
    category: "shopping"
  },
  {
    amount:"₹1,500",
    shopping: "Clothes Shopping",
    date:"17 Nov 2026",
    category:"shopping"
  },

  {
    amount:"800",
    shopping:"veetable Shopping",
    date:"15 Nov 2026",
    category:"Food"
  },
    ]

   


    return(
        <>
             <Navbar/>
             <ExpenseList expenses={expense}/>
        </>
        );
}
export default Homepage;
