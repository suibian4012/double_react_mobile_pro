import React, { Component } from "react";
import PropTypes from "prop-types";
import { reqVerifyCode } from "@api/common";
import { Button } from "antd-mobile";
export default class VerifyButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
  };
  componentDidMount() {
    window.verifyCallback = async (res) => {
      if (res.ret === 0) {
        //校验成功,调用接口，服务端验证
        await reqVerifyCode(res.randstr, res.ticket);
        //做其他事
        await this.props.callback();
      }
    };
  }
  render() {
    const { disabled, buttonText } = this.props;
    return (
      <div>
        <Button
          type="warning"
          className="btn"
          disabled
          style={{ display: disabled ? "block" : "none" }}
        >
          {buttonText}
        </Button>
        <Button
          id="TencentCaptcha"
          data-appid="2030765311"
          data-cbfn="verifyCallback"
          type="warning"
          className="btn"
          style={{ display: !disabled ? "block" : "none" }}
        >
          {buttonText}
        </Button>
      </div>
    );
  }
}
