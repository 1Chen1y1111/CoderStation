import { useState, useRef, useEffect } from "react";
import {
  Modal,
  Radio,
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  message,
} from "antd";

import { useDispatch } from "react-redux";
import { initUserInfo, changeLoginStatus } from "../redux/userSlice";

import {
  getCaptchaApi,
  userIsExistApi,
  addUserApi,
  userLoginApi,
  getUserByIdApi,
} from "../api/user";

import styles from "../css/LoginForm.module.css";

function LoginForm(props) {
  const dispatch = useDispatch();

  const [value, setValue] = useState(1);

  const loginFormRef = useRef();

  const registerFormRef = useRef();

  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: false,
  });

  const [registerInfo, setRegisterInfo] = useState({
    loginId: "",
    nickname: "",
    captcha: "",
  });

  const [captcha, setCaptcha] = useState(null);

  useEffect(() => {
    captchaClickHandle();
  }, [props.isShow]);

  function onLoginTypeChange(e) {
    setValue(e.target.value);
    captchaClickHandle();
  }

  /**
   * 登录
   */
  async function loginHandle() {
    const result = await userLoginApi(loginInfo);

    if (result.data) {
      const data = result.data;
      if (!data.data) {
        message.error("账号或密码不正确");
        captchaClickHandle();
      } else if (!data.data.enabled) {
        message.warning("账号被禁用");
        captchaClickHandle();
      } else {
        localStorage.userToken = data.token;
        const result = await getUserByIdApi(data.data._id);
        dispatch(initUserInfo(result.data));
        dispatch(changeLoginStatus(true));
        handleCancel();
      }
    } else {
      message.warning(result.msg);
      captchaClickHandle();
    }
  }

  /**
   * 注册
   */
  async function registerHandle() {
    const result = await addUserApi(registerInfo);
    console.log("result: ", result);
    if (result.data) {
      message.success("用户注册成功，默认密码为 123456");
      dispatch(initUserInfo(result.data));
      dispatch(changeLoginStatus(true));
      handleCancel();
    } else {
      message.warning(result.msg);
      captchaClickHandle();
    }
  }

  // 切换验证码
  async function captchaClickHandle() {
    const result = await getCaptchaApi();
    setCaptcha(result);
  }

  /**
   * 验证登录账号是否存在
   */
  async function checkLoginIdIsExist() {
    if (registerInfo.loginId) {
      const { data } = await userIsExistApi(registerInfo.loginId);
      if (data) {
        return Promise.reject("该用户已经注册过了");
      }
    }
  }

  function updateInfo(newValue, key) {
    let info = null;
    let setInfoHandle = null;
    if (value === 1) {
      info = { ...loginInfo };
      setInfoHandle = setLoginInfo;
    } else {
      info = { ...registerInfo };
      setInfoHandle = setRegisterInfo;
    }
    info[key] = newValue;
    setInfoHandle(info);
  }

  // 重置并关闭
  function handleCancel() {
    // 清空上一次填写表单
    setRegisterInfo({
      loginId: "",
      nickname: "",
      captcha: "",
    });
    setLoginInfo({
      loginId: "",
      loginPwd: "",
      captcha: "",
      remember: false,
    });
    props.closeModal();
  }

  let container = null;
  if (value === 1) {
    container = (
      <div className={styles.container}>
        <Form
          name="basic1"
          autoComplete="off"
          onFinish={loginHandle}
          ref={loginFormRef}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
          >
            <Input
              placeholder="请输入你的登录账号"
              value={loginInfo.loginId}
              onChange={(e) => updateInfo(e.target.value, "loginId")}
            />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password
              placeholder="请输入你的登录密码，新用户默认为123456"
              value={loginInfo.loginPwd}
              onChange={(e) => updateInfo(e.target.value, "loginPwd")}
            />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            name="logincaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row>
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) => updateInfo(e.target.value, "captcha")}
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="remember"
            wrapperCol={{
              offset: 4,
              span: 20,
            }}
          >
            <Checkbox
              onChange={(e) => updateInfo(e.target.checked, "remember")}
              checked={loginInfo.remember}
            >
              记住我
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 26 }}
            >
              登录
            </Button>
            <Button type="primary" htmlType="reset">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    container = (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={registerHandle}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Form.Item
            label="注册账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号，仅此项为必填项",
              },
              // 验证用户是否已经存在
              { validator: checkLoginIdIsExist },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) => updateInfo(e.target.value, "loginId")}
            />
          </Form.Item>

          <Form.Item label="用户昵称" name="nickname">
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickname}
              onChange={(e) => updateInfo(e.target.value, "nickname")}
            />
          </Form.Item>

          <Form.Item
            name="registercaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row>
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) => updateInfo(e.target.value, "captcha")}
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 26 }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="reset">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  return (
    <div>
      <Modal
        title="注册/登录"
        open={props.isShow}
        onCancel={props.closeModal}
        footer={null}
      >
        <Radio.Group
          value={value}
          onChange={onLoginTypeChange}
          className={styles.radioGroup}
          buttonStyle="solid"
        >
          <Radio.Button value={1} className={styles.radioButton}>
            登录
          </Radio.Button>
          <Radio.Button value={2} className={styles.radioButton}>
            注册
          </Radio.Button>
        </Radio.Group>

        {container}
      </Modal>
    </div>
  );
}

export default LoginForm;
