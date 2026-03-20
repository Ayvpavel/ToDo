import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../../store/userSlice";
import {
  validateEmail,
  validatePassword,
} from "../../../hooks/Dispatch/validate";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/Dispatch/useAppSelector";
import type { UserProfile } from "../../api/user";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
// import { loginUser } from "../../store/userSlice";
function LoginForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым",
  );
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      console.log(result, "result");
      // если логин успешный
      navigate("/profile");
    } catch (error) {
      // если ошибка
      alert("Неверный пароль или пользователь не зарегистрирован на Сайте");
    }
  };
  const blurHendler = (e: any) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  const emailHandler = (e: any) => {
    const value = e.target.value;

    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const passwordHandler = (e: any) => {
    const value = e.target.value;

    setPassword(value);
    setPasswordError(validatePassword(value));
  };
  // const profile: UserProfile | null = useAppSelector(
  //   (state) => state.user.profile,
  // );
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form className="homeCaseBlock" onSubmit={handleSubmit}>
      <div className="homePage">
        <div className="homePage-div">
          <h1 className="teg"> Войдите в личный кабинет</h1>

          <div className="form-flex">
            <label htmlFor="email">Email</label>
            {emailDirty && emailError && (
              <div style={{ color: "red" }}>{emailError}</div>
            )}
            <input
              onBlur={(e) => blurHendler(e)}
              id="email"
              name="email"
              className="inputLogin"
              type="email"
              placeholder="email"
              value={email}
              onChange={emailHandler}
              minLength={6}
              required
            />
          </div>
          <div className="form-flex">
            <label htmlFor="password">Пароль</label>
            {passwordDirty && passwordError && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
            <input
              onBlur={(e) => blurHendler(e)}
              id="password"
              name="password"
              className="inputPassword"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={passwordHandler}
              placeholder="Пароль"
            />
            <button type="button" onClick={togglePassword} className="Outlined">
              {" "}
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </button>
          </div>
          <button type="submit" className="loginTodoBtn">
            Войти
          </button>
          <Link type="submit" to="/register" className="register-button">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
