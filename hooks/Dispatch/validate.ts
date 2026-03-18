export function validateEmail(email: string) {
    console.log()

  if (!email.length) return "Email не может быть пустым";

  const re =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (!re.test(email.toLowerCase())) {
    return "Некорректный Email";
  }

  return "";
}

export function validatePassword(password: string) {
  if (!password.length) return "Пароль не может быть пустым";
  if (password.length < 6) {
    return "Пароль должен быть минимум 6 символов";
  }

  return "";
}
