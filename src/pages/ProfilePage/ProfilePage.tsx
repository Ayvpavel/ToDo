import { Link} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import type { ChangePasswordRequest, UserProfile } from "../../api/user";
import "./ProfilePageCss.css";
import { useEffect, useState } from "react";
import { changePasswordThunk } from "../../../store/userSlice";

function ProfilePage() {
  const [editOldPass, setEditOldPass] = useState("");
  const [editNewPass, setEditNewPass] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorPassword, setErrorPass] = useState("");
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (!repeatPassword) {
      setErrorPass("");
      return;
    }
    if (editNewPass !== repeatPassword) {
      setErrorPass("Пароли не совпадают");
    } else {
      setErrorPass("");
    }
  }, [editNewPass, repeatPassword]);
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
    dispatch(changePasswordThunk(data));
    // navigate("/todo");
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
          <h2>Изменение пароля </h2>

          <form
            className="formEditPass"
            action=""
            onSubmit={handleChangePassword}
          >
            <input
              placeholder="Старый пароль"
              className="oldPass"
              type="password"
              onChange={(e) => {
                setEditOldPass(e.target.value);
              }}
            />{" "}
            <input
              placeholder="Новый пароль"
              className="newPass"
              value={editNewPass}
              type="password"
              onChange={(e) => {
                setEditNewPass(e.target.value);
              }}
            />{" "}
            <input
              placeholder="Введите повторно новый пароль"
              className={`inputPassword ${errorPassword ? "error" : ""}`}
              type="password"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />{" "}
            <p className="errorPass">{errorPassword}</p>
            <button
              className={`savePass ${!editOldPass || !editNewPass || !repeatPassword || errorPassword ? "disabled" : ""}`}
              type="submit"
              disabled={
                !editOldPass ||
                !editNewPass ||
                !repeatPassword ||
                !!errorPassword
              }
            >
              СОХРАНИТЬ
            </button>
            {error ? (
              <p className="errorPass">{error}</p>
            ) : success ? (
              <p className="successPass">{success}</p>
            ) : null}
            <Link to="/todo" className="loginTodoBtn">
              Открыть ToDo List
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
