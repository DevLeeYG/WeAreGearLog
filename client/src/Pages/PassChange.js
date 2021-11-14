import React, { useState } from 'react';
import axios from 'axios';
import { passwordCheck } from '../AuthModule/Verifi';
import { useHistory } from 'react-router';
import AuthTemplate from '../Auth/AuthTemplate';
const PassChange = ({ authRegi, authorization }) => {
  const history = useHistory();
  const [checkPass, setCheckPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passCf, setPassCf] = useState('');

  const check = (e) => {
    setCheckPass(e.target.value);
  };

  const passCheck = (e) => {
    setNewPass(e.target.value);
  };
  const passCff = (e) => {
    setPassCf(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!passwordCheck(newPass)) {
      return alert('비밀번호로 적합하지않습니다');
    }

    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/user/password`,
        {
          username: authRegi.username,
          password: checkPass,
          newPassword: newPass,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
       
        if (res.status === 202) {
          alert('변경전패스워드가 맞지않습니다');
        } else {
          let token = res.data.token;
          localStorage.setItem('token', token);
          authorization();
          alert('패스워드가 변경되었습니다');
          history.push('/account/mypage');
        }
      });
  };

  return (
    <AuthTemplate>
      <form onSubmit={onSubmit} className="my">
        <div className="mypage">
          <h1>비밀번호 변경</h1>
          <span className="type-selector-2">
            개인정보 보호를 위해 비밀번호를 주기적으로 변경해주세요.
          </span>
          <br></br>
          <br></br>

          <input
            type="password"
            onChange={check}
            value={checkPass}
            className="email"
            placeholder="현재비밀번호"
          ></input>
          <input
            onChange={passCheck}
            type="password"
            value={newPass}
            className="email"
            placeholder="신규 비밀번호"
          ></input>
          <input
            onChange={passCff}
            type="password"
            value={passCf}
            className="email"
            placeholder="신규 비밀번호 확인"
          ></input>
          <button className="loginButton">변경하기</button>
        </div>
      </form>
    </AuthTemplate>
  );
};

export default PassChange;
