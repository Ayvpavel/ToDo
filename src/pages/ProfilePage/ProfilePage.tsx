import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import type { ChangePasswordRequest, UserProfile } from "../../api/user";
import "./ProfilePageCss.css";
import { use, useState } from "react";
import { handleAccept } from "../../../store/todoSlice";
import { changePasswordThunk } from "../../../store/userSlice";

function ProfilePage() {
  const [editOldPass, setEditOldPass] = useState(" ");
  const [editNewPass, setEditNewPass] = useState(" ");
  const dispatch = useAppDispatch();

  const profile: UserProfile | null = useAppSelector(
    (state) => state.user.profile,
  );
  const success = useAppSelector((state) => state.user.success);

  const error = useAppSelector((state) => state.user.error);
  const handleChangePassword = (e: any) => {
    e.preventDefault();
    const data: ChangePasswordRequest = {
      oldPassword: editOldPass,
      newPassword: editNewPass,
    };
    dispatch(changePasswordThunk(data))
      .unwrap() // превращаем thunk в промис
      .then((res) => {
        console.log("Пароль изменён:", res);
      })
      .catch((err) => {
        console.log("Ошибка:", err);
      });
  };
  return (
    <>
      <div className="profil ">
        <h1 className="profileH1">Profile</h1>
        <div className="userInfo">
          {profile && <p className="user email">Email_{profile.email}</p>}
          {profile && <p className="user age">Age_{profile.age}</p>}

          {profile && (
            <p className="user data">
              Дата регистрации _
              {new Date(profile.createdAt).toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          )}
          <h2>Смена пароля</h2>
          <p className="errorPass">{error}</p>
          <p className="successPass">{success}</p>
          <form
            className="formEditPass"
            action=""
            onSubmit={handleChangePassword}
          >
            <input
              placeholder="Старый пароль"
              className="oldPass"
              type="text"
              onChange={(e) => {
                setEditOldPass(e.target.value);
              }}
            />{" "}
            <input
              placeholder="Новый пароль"
              className="newPass"
              type="text"
              onChange={(e) => {
                setEditNewPass(e.target.value);
              }}
            />{" "}
            <button className="savePass" type="submit">
              Подтверждение
            </button>
          </form>
        </div>
        {/* <Link to="/todo" className="loginBTN">
          Открыть ToDo List
        </Link> */}
      </div>
    </>
  );
}

export default ProfilePage;
