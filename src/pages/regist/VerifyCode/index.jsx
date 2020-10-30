import React, { Component } from "react";
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
import { reqSendCode } from "@api/login";
import { createForm } from "rc-form";
import "./index.css";
import msg from "./msg.png";
const TOTAL_TIME = 5;
class VerifyCode extends Component {
  state = {
    time: TOTAL_TIME, //倒计时总时间
    switchBtn: true, //切换按钮，倒计时或者发送验证码，true为倒计时
    isDisabled: true, //切换下一步按钮的状态
  };
  //倒计时
  countdown = () => {
    this.timer = setInterval(() => {
      let time = this.state.time - 1;
      if (time <= 0) {
        //倒计时结束，清除计时器
        clearInterval(this.timer);
        //按钮切换到获取验证码
        this.setState({
          switchBtn: false,
          time: TOTAL_TIME,
        });
      }
      this.setState({
        time,
      });
    }, 1000);
  };
  //点击获取验证码
  sendMsg = () => {
    const phone = this.props.location.state;
    //弹框
    Modal.alert("", `我们将发送短信至：${phone}`, [
      {
        text: "取消",
      },
      {
        text: "同意",
        style: { backgroundColor: "red", color: "#fff" },
        onPress: async () => {
          //点击确定发送，调用接口
          await reqSendCode(phone);
          //切换按钮到倒计时
          this.setState({
            switchBtn: true,
            time: TOTAL_TIME,
          });
          //倒计时
          this.countdown();
        },
      },
    ]);
  };
  //验证输入的验证码是否符合正则、
  validator = (rule, value, callback) => {
    const reg = /^[0-9]{6}$/;
    let isDisabled = true;
    if (reg.test(value)) {
      isDisabled = false;
    }
    this.setState({
      isDisabled,
    });
    callback();
  };
  //点击下一步跳转到密码界面
  goVerifyPassword = () => {
    this.props.history.push("/regist/verifypassword");
  };
  componentDidMount() {
    this.countdown();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { time, switchBtn, isDisabled } = this.state;
    const btnClass = switchBtn ? "sendcode-btn" : "";
    const btnText = switchBtn ? `重新发送${time}` : "获取验证码";
    const { getFieldProps } = this.props.form;
    return (
      <div className="code">
        <NavBar
          mode="light"
          icon={<Icon className="icon-left" type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          硅谷注册
        </NavBar>
        <WingBlank size="lg">
          <img src={msg} alt="msg" className="code-img" />
          <p className="code-msg">
            我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
          </p>
          <div className="code-input-container">
            <InputItem
              clear
              placeholder="请输入手机验证码"
              {...getFieldProps("code", {
                rules: [{ validator: this.validator }],
              })}
            />
            <button className={btnClass} disabled onTouchEnd={this.sendMsg}>
              {btnText}
            </button>
          </div>
          <WingBlank size="lg">
            <Button
              type="warning"
              disabled={isDisabled}
              className="warning-btn"
              onClick={this.goVerifyPassword}
            >
              下一步
            </Button>
          </WingBlank>
          <div className="code-question">
            <span>遇到问题？请</span>
            <Link className="code-question-link" to="/">
              联系客服
            </Link>
          </div>
        </WingBlank>
      </div>
    );
  }
}
export default createForm()(VerifyCode);
