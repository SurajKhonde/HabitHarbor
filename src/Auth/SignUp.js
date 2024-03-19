import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {createUser} from "../Api/auth";
import { useAuth, useNotification } from "../hooks/helper";
import { isValidEmail } from "../Utility/helper";
import { commonModalClasses } from "../Utility/theme";
import Container from "../Utility/Container";
import CustomLink from "../Utility/CustomLink";
import FormContainer from "../Utility/FormContainer";
import FormInput from "../Utility/FormInput";
import Submit from "../Utility/Submit";
import Title from "../Utility/Title";
const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function SignUp() {    
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { authInfo} = useAuth();
  const { isLoggedIn } = authInfo;
   console.log(isLoggedIn)
  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification("error", error);
    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error)
    localStorage.setItem("auth-token", response.user.token);
    navigate("/auth/signin", {
      replace: true,
    });
  };
  const { name, email, password } = userInfo;
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            label="Name"
            placeholder="John Doe"
            name="name"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign up" />
          <div className="flex justify-center">
            <CustomLink to="/auth/signin">Already User?</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
