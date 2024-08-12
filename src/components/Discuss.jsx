import { useState, useEffect, useRef } from "react";
import { Comment } from "@ant-design/compatible";
import { Avatar, Form, Button, List, Tooltip, message, Pagination } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import {
  getIssueCommentByIdApi,
  addCommentApi,
  getBookCommentByIdApi,
} from "../api/comment";
import { editUserApi, getUserByIdApi } from "../api/user";
import { updateIssueApi } from "../api/issue";
import { formatDate } from "../utils/tools";

import { updateUserInfoAsync } from "../redux/userSlice";
import { useDispatch } from "react-redux";

import styles from "../css/Discuss.module.css";

function Discuss(props) {
  const dispatch = useDispatch();

  const { userInfo, isLogin } = useSelector((state) => state.user);
  const [commentList, setCommentList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    current: 1, // 当前是第一页
    pageSize: 10, // 每一页显示 10 条数据
    total: 0, // 数据的总条数
  });

  const editorRef = useRef();

  useEffect(() => {
    async function fetchData() {
      let data = null;
      if (props.commentType === 1) {
        // 传递过来的是问答的 id，所以需要获取该问答 id 所对应的评论
        const result = await getIssueCommentByIdApi(props.targetId, {
          current: pageInfo.current,
          pageSize: pageInfo.pageSize,
        });
        data = result.data;
      } else if (props.commentType === 2) {
        // 传递过来的是书籍的 id，所以需要获取该书籍 id 所对应的评论
        const result = await getBookCommentByIdApi(props.targetId, {
          current: pageInfo.current,
          pageSize: pageInfo.pageSize,
        });
        data = result.data;
      }
      for (let i = 0; i < data.data.length; i++) {
        const result = await getUserByIdApi(data.data[i].userId);
        // 将用户的信息添加到评论对象上面
        data.data[i].userInfo = result.data;
      }
      // 更新评论数据
      setCommentList(data.data);
      // 更新分页数据
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }

    if (props.targetId) {
      fetchData();
    }
  }, [props.targetId, refresh, pageInfo.current, pageInfo.pageSize]);

  // 根据登录状态进行头像处理
  let avatar = null;
  if (isLogin) {
    avatar = <Avatar src={userInfo.avatar} />;
  } else {
    avatar = <Avatar icon={<UserOutlined />} />;
  }

  /**
   * 添加评论
   */
  async function onAddDiscussHandle() {
    let _comment = null;
    _comment = editorRef.current.getInstance().getHTML();
    if (_comment === "<p><br></p>") {
      _comment = "";
    }
    if (!_comment) {
      message.warning("请输入评论内容");
      return;
    }
    await addCommentApi({
      userId: userInfo._id,
      typeId: props.issueInfo ? props.issueInfo.typeId : props.bookInfo.typeId,
      commentContent: _comment,
      commentType: props.commentType,
      bookId: props.bookInfo?._id,
      issueId: props.issueInfo?._id,
    });

    setRefresh(!refresh);
    editorRef.current.getInstance().reset();

    // 更新评论问答次数

    updateIssueApi(props.targetId, {
      commentNumber: props.issueInfo
        ? ++props.issueInfo.commentNumber
        : ++props.bookInfo.commentNumber,
    });
    // 增加对应用户的积分
    editUserApi(userInfo._id, {
      points: userInfo.points + 4,
    });

    dispatch(
      updateUserInfoAsync({
        userId: userInfo._id,
        newInfo: {
          points: userInfo.points + 4,
        },
      })
    );

    message.success("评论添加成功，积分+4");
  }

  // 评论分页
  function handlePageChange(current, pageSize) {
    setPageInfo({
      current,
      pageSize,
      total: pageInfo.total,
    });
  }

  return (
    <div>
      {/* 评论框 */}
      <Comment
        avatar={avatar}
        content={
          <>
            <Form.Item>
              <Editor
                initialValue=""
                previewStyle="vertical"
                height="270px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                language="zh-CN"
                ref={editorRef}
                className="editor"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                disabled={isLogin ? false : true}
                onClick={onAddDiscussHandle}
              >
                添加评论
              </Button>
            </Form.Item>
          </>
        }
      />

      {/* 评论列表 */}
      {commentList?.length > 0 && (
        <List
          header="当前评论"
          dataSource={commentList}
          renderItem={(item) => (
            <Comment
              avatar={<Avatar src={item.userInfo.avatar} />}
              content={
                <div
                  dangerouslySetInnerHTML={{ __html: item.commentContent }}
                />
              }
              datetime={
                <Tooltip title={formatDate(item.commentDate, "year")}>
                  <span>{formatDate(item.commentDate, "year")}</span>
                </Tooltip>
              }
            />
          )}
        />
      )}

      {/* 分页 */}
      {commentList.length > 0 ? (
        <div className={styles.paginationContainer}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            onChange={handlePageChange}
            total={pageInfo.total}
          />
        </div>
      ) : (
        <div
          style={{
            fontWeight: "200",
            textAlign: "center",
            margin: "50px",
          }}
        >
          暂无评论
        </div>
      )}
    </div>
  );
}

export default Discuss;
