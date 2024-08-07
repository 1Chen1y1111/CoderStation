import React from "react";
import IssueItem from "../components/IssueItem";

/**
 * 容器组件
 * @param {} props
 * @returns
 */
function SearchResultItem(props) {
  return (
    <div>
      {props.info.issueTitle ? <IssueItem issueInfo={props.info} /> : null}
    </div>
  );
}

export default SearchResultItem;
