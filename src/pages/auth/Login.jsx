import React from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import styled from "styled-components";
import { instance } from "../../network/request";
import { validEmail, validPw } from "../auth/Join";

export const Login = () => {
  const navigate = useNavigate();
  const [email, , emailHandler] = useInput();
  const [password, , pwHandler] = useInput();

  async function login(email, password) {
    try {
      const reqdata = { email, password };
      const res = await instance.post(`/auth/signin`, reqdata);
      console.log(res);
      if (res.data.success === false) {
        alert(res.data.error);
      } else {
        const accessToken = res.data.access_token;
        localStorage.setItem("access_token", accessToken);
        navigate("/todo");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loginHandler = () => {
    if (email === "" || password === "") {
      alert("이메일과 비밀번호를 입력하세요.");
    } else if (validEmail.test(email) && validPw.test(password)) {
      login(email, password);
    } else {
      alert("이메일이나 비밀번호가 유효한 형식이 아닙니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="이메일을 입력하세요."
          title="email"
          value={email}
          onChange={emailHandler}
        ></input>
        <input
          placeholder="비밀번호 입력(4~16자 영문, 숫자 조합)"
          title="password"
          type="password"
          value={password}
          onChange={pwHandler}
        ></input>
        <button
          onClick={loginHandler}
          disabled={email === "" || password === ""}
        >
          로그인
        </button>
        <div>OR</div>
        <div>
          <p>아직 회원이 아니세요?</p>
          <p onClick={() => navigate("/join")} style={{ cursor: "pointer" }}>
            회원가입 ＞
          </p>
        </div>
      </form>
    </div>
  );
};

const LoginContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25vh auto;
  height: 430px;
  width: 400px;
  & h2 {
    margin-bottom: 50px;
    font-size: 45px;
  }
`;

const EmailBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  & label {
    font-size: 25px;
    margin-bottom: 5px;
  }
  & input {
    border: none;
    border-bottom: 1px solid black;
    width: 213px;
    height: 30px;
    font-size: 15px;
    background-color: transparent;
  }
`;

const PasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  & label {
    font-size: 23px;
    margin-bottom: 5px;
  }
  & input {
    border: none;
    border-bottom: 1px solid black;
    width: 213px;
    height: 30px;
    font-size: 15px;
    background-color: transparent;
    margin-bottom: 10px;
  }
`;
