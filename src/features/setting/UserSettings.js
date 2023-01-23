import "./UserSettings.css";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setFullName, setCity, setState } from "./slices/settingSlice";
import { setPopup } from "../popup/slices/popupSlice";
import { resetUser } from "../../appSlice";
// Routing
import { useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";
import * as userAPI from "../../apis/userAPI";
// Components
import UserSettingsForm from "../../components/form/UserSettingsForm";

export default function UserSettings() {
  // State
  const authUser  = useSelector((state) => state.app.authUser);
  const { fullName, city, state}  = useSelector((state) => state.setting);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //----- Submit form data
  const handleSubmit = e => {
    // Prevent refesh on submit
    e.preventDefault();

    // Check authentication
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        // Edit user
        return userAPI.editUser(authUser._id, fullName, city, state);
      } else {
        return { message: "Session has expired" };
      }
    })
    .then(res => {
      if(res.message) {
        dispatch(setPopup({
          message: res.message,
          type: "error"
        }));

        dispatch(resetUser());

        // Redirect to home page
        navigate("/");
      } else if(res.data.success) {
        dispatch(setPopup({
          message: "Information updated",
          type: "success"
        }));
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="userSettings">
      <div id="userSettings-header">
        <h1>User Settings</h1>
      </div>

      <div id="userSettings-form-wrapper">
        <UserSettingsForm
          setFullName={ setFullName }
          setCity={ setCity }
          setState={ setState }
          handleSubmit={ handleSubmit }/>
      </div>
    </div>
  );
};