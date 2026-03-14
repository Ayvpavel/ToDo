import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import type { UserProfile } from "../../api/user";
// import { loginUser } from "../../store/userSlice";
function LoginForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
dispatch(loginUser({ email, password }));

  // переход
  navigate("/profile");
    dispatch(loginUser({ email, password }));
  };
  const profile: UserProfile | null = useAppSelector(
    (state) => state.user.profile,
  );
  return (
    <form className="homeCaseBlock" onSubmit={handleSubmit}>
      <div className="homePage">
        <div className="homePage-div">
          <h1 className="teg"> Войдите в личный кабинет</h1>

          <div className="form-flex">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              className="inputLogin"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              minLength={6}
              required
            />
          </div>
          <div className="form-flex">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              name="password"
              className="inputPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
          </div>
          <button  type="submit" className="loginBTN">
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
