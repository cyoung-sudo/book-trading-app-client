import "./AllUsers.css";
// React
import { useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "./slices/userSlice";
// APIs
import * as userAPI from "../../apis/userAPI";
// Components
import UsersDisplay from "../../components/display/UsersDisplay";
import Loading from "../../components/static/Loading";

export default function AllUsers() {
  // State
  const users = useSelector((state) => state.user.users);
  // Hooks
  const dispatch = useDispatch();

  //----- Retrieve users on load
  useEffect(() => {
    userAPI.getAll()
    .then(res => {
      if(res.data.success) {
        dispatch(setUsers(res.data.users));
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(users) {
    return (
      <div id="allUsers">
        <div id="allUsers-header">
          <h1>Users</h1>
        </div>
  
        <div id="allUsers-usersDisplay-wrapper">
          <UsersDisplay users={ users }/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};