import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { registerUser } from "../../../store/userSlice";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(
      registerUser({
        email,
        age: Number(age),
        password,
      }),
    );
  };
  return (
    <form className="homeCaseBlock" onSubmit={handleSubmit}>
      <div className="homePage">
        <div className="homePage-div">
          <h1 className="teg">Начните пользоваться Todo List</h1>

          <div className="form-flex">
            <label htmlFor="email">Email </label>
            <input
              className="inputLogin"
              type="email"
              minLength={6}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <input
              className="inputPassword"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              required
            />
            <button
              className="showPassword"
              onClick={togglePassword}
              type="button"
            >
              {showPassword ? "Скрыть пароль" : "Показать пароль"}
            </button>
          </div>
          <button type="submit" className="register-button">
            Зарегистрироваться
          </button>

          <Link to="/profile">Перейти в профиль</Link>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
