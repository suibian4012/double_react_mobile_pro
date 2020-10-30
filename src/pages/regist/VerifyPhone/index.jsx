import React, { Component } from "react";
import { NavBar, Icon, InputItem, WingBlank, Modal } from "antd-mobile";
import { createForm } from "rc-form";
import { reqVerifyPhone } from "../../../api/regist";
import { reqSendCode } from "@api/login";
import "./index.css";
import VerifyButton from "@components/VerifyButton";
class VerifyPhone extends Component {
  state = {
    disabled: true,
  };
  componentDidMount() {
    // Modal.alert(
    //   "注册协议及隐私政策",
    //   <span className="policy-text">
    //     在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
    //     <strong className="policy-strong-text">
    //       请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）
    //     </strong>
    //     ：<span className="policy-content">《硅谷用户注册协议》</span>
    //     <span className="policy-content">《硅谷隐私政策》</span>
    //   </span>,
    //   [
    //     {
    //       text: "不同意",
    //       onPress: () => console.log("cancel"),
    //     },
    //     {
    //       text: "同意",
    //       onPress: () => console.log("ok"),
    //       style: { backgroundColor: "red", color: "#fff" },
    //     },
    //   ]
    // );
  }
  //验证手机号是否通过正则，来控制下一步按钮的禁用状态
  validator = (rule, value, callback) => {
    //获取输入框中输入的值
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    let disabled = true;
    if (reg.test(value)) {
      disabled = false;
    }
    this.setState({
      disabled,
    });
    callback();
  };
  //验证手机号是否注册
  verifyPhone = async () => {
    try {
      //收集输入的手机号
      const phone = this.props.form.getFieldValue("phone");
      //验证手机号是否注册过
      await reqVerifyPhone(phone);
      //请求成功，手机号没有注册过---发送短信验证码
      this.sendmsgVerifyCode();
    } catch (e) {
      console.log(e);
    }
  };
  //短信验证码
  sendmsgVerifyCode = () => {
    const phone = this.props.form.getFieldValue("phone");
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
          //跳转界面,并传参，后续验证码验证需要参数
          this.props.history.push("/regist/verifycode", phone);
        },
      },
    ]);
  };
  render() {
    const { getFieldProps } = this.props.form;
    const { disabled } = this.state;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" className="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册
        </NavBar>
        <WingBlank>
          <div className="ipt_container">
            <InputItem
              clear
              placeholder="请输入手机号"
              {...getFieldProps("phone", {
                rules: [{ validator: this.validator }],
              })}
            >
              <div className="ipt_prefix">
                <span>+86</span>
                <Icon type="down" />
              </div>
            </InputItem>
          </div>

          <VerifyButton
            disabled={disabled}
            buttonText={"下一步"}
            callback={this.verifyPhone}
          />
        </WingBlank>
      </div>
    );
  }
}
export default createForm()(VerifyPhone);
