import { useState, useEffect } from "react";
import { getIssueByPageApi } from "../api/issue";

import { Pagination } from "antd";
import IssueItem from "../components/IssueItem";
import PageHeader from "../components/PageHeader";
import AddIssueBtn from "../components/AddIssueBtn";
import Recommend from "../components/Recommend";
import ScrollRank from "../components/ScrollRank";

import styles from "../css/Issue.module.css";

function Issues(props) {
  const [issueInfo, setIssueInfo] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  function handlePageChange(current, pageSize) {
    setPageInfo({
      current,
      pageSize,
    });
  }

  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssueByPageApi({
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      });
      setIssueInfo(data.data);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }
    fetchData();
  }, [pageInfo.current, pageInfo.pageSize]);

  let issueList = [];
  for (let i = 0; i < issueInfo.length; i++) {
    issueList.push(<IssueItem key={i} issueInfo={issueInfo[i]} />);
  }

  return (
    <div className={styles.container}>
      <PageHeader title="问答列表" />
      <div className={styles.issueContainer}>
        {/* 左边区域 */}
        <div className={styles.leftSide}>
          {issueList}
          <div className="paginationContainer">
            <Pagination
              defaultCurrent={1}
              {...pageInfo}
              onChange={handlePageChange}
            />
          </div>
        </div>
        {/* 右边区域 */}
        <div className={styles.rightSide}>
          <AddIssueBtn />
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <Recommend />
          </div>
          <ScrollRank />
        </div>
      </div>
    </div>
  );
}

export default Issues;
