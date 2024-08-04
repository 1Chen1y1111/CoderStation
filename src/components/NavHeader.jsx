import React from "react";
import { NavLink } from "react-router-dom";
import { Space, Input, Select } from "antd";

import LoginAvatar from "./LoginAvatar";

function NavHeader(props) {
  return (
    <div className="headerContainer">
      {/* 头部logo */}
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      {/* 头部导航 */}
      <nav className="navContainer">
        <NavLink to="/" className="navigation">
          问答
        </NavLink>
        <NavLink to="/books" className="navigation">
          书籍
        </NavLink>
        <NavLink to="/interviews" className="navigation">
          面试题
        </NavLink>
      </nav>
      {/* 搜索框 */}
      <div className="searchContainer">
        <Space.Compact>
          <Select defaultValue="issue" size="large" style={{ width: "20%" }}>
            <Select.Option value="issue">问答</Select.Option>
            <Select.Option value="book">书籍</Select.Option>
          </Select>
          <Input.Search
            placeholder="请输入要搜索的内容"
            allowClear
            enterButton="搜索"
            size="large"
            style={{
              width: "80%",
            }}
          />
        </Space.Compact>
      </div>
      {/* 登录按钮 */}
      <div className="loginBtnContainer">
        <LoginAvatar loginHandle={props.loginHandle} />
      </div>
    </div>
  );
}

export default NavHeader;
