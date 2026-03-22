import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/Dispatch/useAppSelector";
import { registerUser } from "../../../store/userSlice";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {
  validateEmail,
  validatePassword,
} from "../../../hooks/Dispatch/validate";
import { useAppSelector } from "../../../hooks";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым",
  );
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);


  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.user);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // navigate("/");
    dispatch(
      registerUser({
        email,
        age: Number(age),
        password,
      }),
    );
  };
  useEffect(() => {
    if (status === "succeeded") {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000); // исчезает через 3 сек
      return () => clearTimeout(timer);
    }
  }, [status]);
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
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);
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
  return (
    <form className="homeCaseBlock" onSubmit={handleSubmit}>
      <div className="homePage">
        <div className="homePage-div">
          <h1 className="teg">Начните пользоваться Todo List</h1>

          <div className="form-flex">
            <label htmlFor="email">Email </label>
            {emailDirty && emailError && (
              <div style={{ color: "red" }}>{emailError}</div>
            )}
            <input
              className={`inputLogin ${emailDirty && emailError ? "error" : ""}`}
              type="email"
              minLength={6}
              name="email"
              required
              value={email}
              onChange={emailHandler}
              onBlur={(e) => blurHendler(e)}
              placeholder="email"
            />
          </div>

          <div className="form-flex">
            <label htmlFor="">Возраст</label>
            <input
              className="inputPassword"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Возраст"
            />
          </div>

          <div className="form-flex">
            <label htmlFor="">Пароль</label>
            {passwordDirty && passwordError && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
            <div></div>
            <input
              className={`inputPassword ${passwordDirty && passwordError ? "error" : ""}`}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={passwordHandler}
              onBlur={(e) => blurHendler(e)}
              placeholder="Пароль"
              name="password"
              required
            />
            <button type="button" onClick={togglePassword} className="Outlined">
              {" "}
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </button>
            {/* 
            <button
              className="showPassword"
              onClick={togglePassword}
              type="button"
            >
              {showPassword ? "Скрыть пароль" : "Показать пароль"}
            </button> */}
          </div>
          <div className="userError">
            {showError && "Пользователь уже существует"}
          </div>
          <button type="submit" className="register-button">
            {status === "loading" ? "Регистрация..." : "Зарегистрироваться"}
          </button>

          {/* <Link to="/profile">Перейти в профиль</Link> */}
        </div>
        {show && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#4BB543", // зелёный для успеха
              color: "white",
              padding: "15px 25px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              zIndex: 1000,
              transition: "all 0.5s ease-in-out",
            }}
          >
            Вы успешно зарегистрировались
          </div>
        )}
      </div>
    </form>
  );
}

export default RegisterForm;
