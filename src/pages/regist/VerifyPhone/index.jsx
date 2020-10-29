import React, { Component } from "react";
import { NavBar, Icon, InputItem, WingBlank, Button } from "antd-mobile";
import { createForm } from "rc-form";
import { reqVerifyPhone } from "../../../api/regist";
import { reqVerifyCode } from "../../../api/common";
import "./index.css";
class VerifyPhone extends Component {
  state = {
    disabled: true,
  };
  componentDidMount() {
    window.verifyCallback = async (res) => {
      if (res.ret === 0) {
        //校验成功,调用接口，服务端验证
        await reqVerifyCode(res.randstr, res.ticket);
        await this.verifyPhone();
      }
    };
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
      const phone = this.props.form.getFieldValue;
      await reqVerifyPhone(phone);
      console.log("success");
    } catch (e) {
      console.log(e);
    }
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
          <Button
            type="warning"
            className="btn"
            disabled
            style={{ display: disabled ? "block" : "none" }}
          >
            下一步
          </Button>
          <Button
            id="TencentCaptcha"
            data-appid="2074282032"
            data-cbfn="verifyCallback"
            type="warning"
            className="btn"
            style={{ display: !disabled ? "block" : "none" }}
          >
            验证
          </Button>
        </WingBlank>
      </div>
    );
  }
}
export default createForm()(VerifyPhone);
