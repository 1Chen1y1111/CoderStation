import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import AddIssueBtn from "../components/AddIssueBtn";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScrollRank";
import SearchResultItem from "../components/SearchResultItem";

import { useLocation } from "react-router-dom";
import { getIssueByPageApi } from "../api/issue";

import styles from "../css/SearchPage.module.css";

function SearchPage(props) {
  const location = useLocation();

  const [searchResult, setSearchResult] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    async function fetchData(state) {
      const { value, searchOption } = state;
      let params = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
        issueStatus: true,
      };
      switch (searchOption) {
        case "issue": {
          params.issueTitle = value;
          const { data } = await getIssueByPageApi(params);
          setSearchResult(data.data);
          setPageInfo({
            current: data.currentPage,
            pageSize: data.eachPage,
            total: data.count,
          });
          break;
        }
        case "book": {
          break;
        }
      }
    }

    if (location.state) {
      fetchData(location.state);
    }
  }, [location.state]);

  return (
    <div className="container">
      <PageHeader title="搜索结果" />
      <div className={styles.searchPageContainer}>
        {/* 左边部分 */}
        <div className={styles.leftSide}>
          {searchResult.length > 0 ? (
            searchResult.map((item) => {
              return <SearchResultItem info={item} key={item._id} />;
            })
          ) : (
            <div>暂无数据</div>
          )}
        </div>
        {/* 右边部分 */}
        <div className={styles.rightSide}>
          <AddIssueBtn />
          <div style={{ marginBottom: 20 }}>
            <Recommend />
          </div>
          <div style={{ marginBottom: 20 }}>
            <ScoreRank />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
