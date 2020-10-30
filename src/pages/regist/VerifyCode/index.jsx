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
export default class VerifyCode extends Component {
  state = {
    time: TOTAL_TIME, //倒计时总时间
    switchBtn: true, //切换按钮，倒计时或者发送验证码，true为倒计时
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
          });
          //倒计时
          this.countdown();
        },
      },
    ]);
  };
  componentDidMount() {
    this.countdown();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { time, switchBtn } = this.state;
    const btnClass = switchBtn ? "sendcode-btn" : "";
    const btnText = switchBtn ? `重新发送${time}` : "获取验证码";
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
            <InputItem clear placeholder="请输入手机验证码" />
            <button className={btnClass} disabled onTouchEnd={this.sendMsg}>
              {btnText}
            </button>
          </div>
          <WingBlank size="lg">
            <Button type="warning" disabled className="warning-btn">
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
