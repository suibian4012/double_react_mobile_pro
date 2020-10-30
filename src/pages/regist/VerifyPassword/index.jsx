import React, { useState } from "react";
import {
  NavBar,
  Icon,
  WingBlank,
  InputItem,
  Button,
  Modal,
  Toast,
} from "antd-mobile";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";
import msg from "./msg.png";
import "./index.css";

function VerifyPassword({ form, history }) {
  //切换icon的状态，ture为闭眼
  const [closeEye, setCloseEye] = useState(true);
  //控制下一步按钮的禁用状态
  const [isDisabled, setDisabled] = useState(true);

  //icon的样式
  const iconClass =
    "iconfont verify-password-icon " + (closeEye ? "icon-eye1" : "icon-eye");
  const { getFieldProps } = form;
  const iptType = closeEye ? "password" : "text";

  //点击icon切换图标
  const switchIcon = () => {
    setCloseEye(!closeEye);
  };
  //密码正则校验
  const validator = (rule, value, callback) => {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
    let isDisabled = true;
    if (reg.test(value)) {
      isDisabled = false;
    }
    setDisabled(isDisabled);
    callback();
  };
  return (
    <div className="password">
      <NavBar
        mode="light"
        icon={<Icon className="icon-left" type="left" />}
        onLeftClick={() => history.goBack()}
      >
        硅谷注册
      </NavBar>
      <WingBlank size="lg">
        <img src={msg} alt="msg" className="password-img" />
        <p className="password-msg">请设置登录密码</p>
        <InputItem
          clear
          type={iptType}
          placeholder="请设置8-20位登录密码"
          extra={<span className={iconClass} onTouchEnd={switchIcon}></span>}
          {...getFieldProps("password", {
            rules: [{ validator }],
          })}
        />
        <p className="password-text">
          密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
        </p>
        <WingBlank size="lg">
          <Button type="warning" disabled={isDisabled} className="warning-btn">
            下一步
          </Button>
        </WingBlank>
        <div className="password-question">
          <span>遇到问题？请</span>
          <Link className="password-question-link" to="/">
            联系客服
          </Link>
        </div>
      </WingBlank>
    </div>
  );
}
export default createForm()(VerifyPassword);
