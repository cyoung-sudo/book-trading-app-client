import "./HomePage.css";
// Routing
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div id="homePage">
      <div id="homePage-header">
        <h1>Book Trading Club</h1>
      </div>

      <div id="homePage-content">
        <div>Browse books from all users</div>
        <div>Add books and trade with other users</div>
        <div>Get started now!!! <Link to="/signup">Signup</Link></div>
      </div>
    </div>
  );
};