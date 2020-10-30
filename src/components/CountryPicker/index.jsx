import React, { Component } from "react";
import { List, NavBar, Icon } from "antd-mobile";
import { reqCountryData } from "@api/common";
import "./index.css";
const Item = List.Item;

export default class CountryPicker extends Component {
  state = {
    countryData: {},
  };
  async componentDidMount() {
    const countryData = await reqCountryData();
    this.setState({ countryData });
  }
  //点击跳转到相关地方
  toCountry = (e) => {
    const id = e.target.textContent;
    window.scrollTo(0, document.getElementById(id).offsetTop - 45);
  };
  //点击Item，返回之前的页面，并将选中的数据传递过去
  goBack = (value) => {
    return () => {
      this.props.history.push(this.props.location.state, value);
    };
  };
  render() {
    const { countryData } = this.state;
    const countryDataKeys = Object.keys(countryData);
    return (
      <div>
        <NavBar
          className="country-picker-nav"
          mode="light"
          icon={<Icon type="left" className="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          硅谷注册
        </NavBar>
        <ul className="country-picker-sideBar" onTouchEnd={this.toCountry}>
          {countryDataKeys.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <div className="country-picker-dataContainer">
          {countryDataKeys.map((key) => {
            return (
              <List renderHeader={() => key} key={key} id={key}>
                {countryData[key].map((item) => {
                  const key = Object.keys(item)[0];
                  const value = "+" + item[key];
                  return (
                    <Item
                      extra={<span style={{ marginRight: 20 }}>{value}</span>}
                      key={key}
                      onClick={this.goBack(value)}
                    >
                      {key}
                    </Item>
                  );
                })}
              </List>
            );
          })}
        </div>
      </div>
    );
  }
}
