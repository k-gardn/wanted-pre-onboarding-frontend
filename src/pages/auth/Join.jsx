import React from "react";
import { useState, useEffect } from "react";
import useInput from "../../hooks/useInput";
import { instance } from "../../network/request";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Email: '@', '.' 포함
export const validEmail =
  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
// 비밀번호: 8~16자 영문, 숫자 조합
export const validPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

export const Join = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repw, , repwHandler] = useInput("");

  //TODO: / 경로에 로그인, 회원가입 기능을 개발. 유효성 검사

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  async function join(email, password) {
    try {
      const res = await instance.post(`/auth/signup`, {
        email,
        password,
      });
      // console.log(res);
      alert("회원가입이 되셨습니다. 로그인 페이지로 이동합니다!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("다른 아이디로 가입해주세요");
    }
  }

  //토큰 여부에 따른 리다이렉트
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <JoinContainer>
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <EmailBox>
          <label>e-mail</label>
          <input
            type="text"
            placeholder="abcde@wanted.com"
            value={email}
            onChange={emailHandler}
          />
        </EmailBox>
        <PasswordBox>
          <label>password</label>
          <input
            type="password"
            value={password}
            placeholder="비밀번호(8자 이상 영문, 숫자 조합)"
            onChange={passwordHandler}
          />
          <input
            placeholder="비밀번호 확인"
            title="repassword"
            type="password"
            value={repw}
            onChange={repwHandler}
          ></input>
        </PasswordBox>
        <JoinButton
          type="submit"
          onClick={() => join(email, password)}
          disabled={
            password !== repw ||
            !validEmail.test(email) ||
            !validPw.test(password) ||
            !validPw.test(repw)
          }
        >
          가입하기
        </JoinButton>
        <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
      </form>
    </JoinContainer>
  );
};

const JoinContainer = styled.div`
  border-radius: 20px;
  background-color: #5720af32;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25vh auto;
  height: 430px;
  width: 400px;
  & h2 {
    margin-bottom: 5vh;
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
  margin-bottom: 3vh;

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

const JoinButton = styled.button`
  border: transparent;
  border-radius: 5px;
  /* padding: 8px 12px; */
  background-color: #6949e980;
  background-color: ${(props) => (props.disabled ? "gray" : "#6949e980;")};
  width: 75px;
  height: 30px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-right: 15px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  border: transparent;
  border-radius: 5px;
  /* padding: 8px 10px; */
  background-color: #5e49e98e;
  width: 75px;
  height: 30px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
