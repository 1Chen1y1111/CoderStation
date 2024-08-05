import { useRef, useState, useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getTypeList } from "../redux/typeSlice";
import { useNavigate } from "react-router-dom";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { addIssueApi } from "../api/issue";

import styles from "../css/AddIssue.module.css";

function AddIssue(props) {
  const editorRef = useRef();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { typeList } = useSelector((state) => state.type);
  const { userInfo } = useSelector((state) => state.user);

  const [issueInfo, setIssueInfo] = useState({
    issueTitle: "",
    issueContent: "",
    userId: "",
    typeId: "",
  });

  useEffect(() => {
    if (!typeList.length) {
      // 派发 action 来发送请求，获取到数据填充到状态仓库
      dispatch(getTypeList());
    }
  }, []);

  async function addHandle(values) {
    const content = editorRef.current.getInstance().getHTML();
    const _issueInfo = {
      ...issueInfo,
      ...values,
      issueContent: content,
      userId: userInfo._id,
    };
    await addIssueApi(_issueInfo);
    navigate("/");
    message.success("你的问题已经提交，审核通过后将会进行展示");
  }

  /**
   * 批量生成下拉列表的 option
   */

  function typeOptionCreator(Select, typeList) {
    let optionContainer = [];
    for (let i = 0; i < typeList.length; i++) {
      optionContainer.push(
        <Select.Option value={typeList[i]._id} key={typeList[i]._id}>
          {typeList[i].typeName}
        </Select.Option>
      );
    }
    return optionContainer;
  }

  function updateInfo(value, key) {
    const _issueInfo = { ...issueInfo };
    _issueInfo[key] = value;
    setIssueInfo(_issueInfo);
    console.log("issueInfo: ", issueInfo);
  }

  return (
    <div className={styles.container}>
      <Form
        form={form}
        name="basic"
        initialValues={issueInfo}
        autoComplete="off"
        onFinish={addHandle}
      >
        {/* 问答标题 */}
        <Form.Item
          label="标题"
          name="issueTitle"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input placeholder="请输入标题" size="large" />
        </Form.Item>

        {/* 问题类型 */}
        <Form.Item
          label="问题分类"
          name="typeId"
          rules={[{ required: true, message: "请选择问题所属分类" }]}
        >
          <Select style={{ width: 200 }}>
            {typeOptionCreator(Select, typeList)}
          </Select>
        </Form.Item>

        {/* 问答内容 */}
        <Form.Item
          label="问题描述"
          name="issueContent"
          rules={[{ required: true, message: "请输入问题描述" }]}
        >
          <Editor
            initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            language="zh-CN"
            ref={editorRef}
          />
        </Form.Item>

        {/* 确认按钮 */}
        <Form.Item wrapperCol={{ offset: 3, span: 21 }}>
          <Button type="primary" htmlType="submit">
            确认新增
          </Button>

          <Button type="link" htmlType="reset" className="resetBtn">
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddIssue;
