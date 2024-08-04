import { useState, useEffect } from "react";
import { Layout, message } from "antd";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import LoginForm from "./components/LoginForm";
import { getInfoApi, getUserByIdApi } from "./api/user";

import { useDispatch } from "react-redux";
import { initUserInfo, changeLoginStatus } from "./redux/userSlice";

import "./css/App.css";

import RouterConfig from "./router";

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const res = await getInfoApi();
      if (res.data) {
        const { data } = await getUserByIdApi(res.data._id);
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
      } else {
        message.warning(res.msg);
        localStorage.removeItem("userToken");
      }
    }
    if (localStorage.getItem("userToken")) {
      fetchData();
    }
  }, []);

  // 打开弹窗
  function loginHandle() {
    setIsModalOpen(true);
  }

  // 关闭弹窗
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      {/* 头部 */}
      <Header className="header">
        <NavHeader loginHandle={loginHandle} />
      </Header>
      {/*  匹配上的路由页面*/}
      <Content className="content">
        <RouterConfig />
      </Content>
      {/* 底部 */}
      <Footer className="footer">
        <PageFooter />
      </Footer>
      {/* 登录弹窗 */}
      <LoginForm isShow={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
