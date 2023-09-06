import React from "react";
import AddFoodData from "./Components/AddFoodData";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import OrderSection from "./Components/Orders/OrderSection";
import ShowOrderSpecific from "./Components/Orders/ShowOrderSpecific";

const App=()=> {
  return (
         <Router>
             <Routes>
              <Route path="/orders" element={<OrderSection />} />
              <Route path="/addfood" element={<AddFoodData />} />
              <Route path="/orderdetails/:orderid" element={<ShowOrderSpecific/>} />
             </Routes>
         </Router>  

  );
}

export default App;
