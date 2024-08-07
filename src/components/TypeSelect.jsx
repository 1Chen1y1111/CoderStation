import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypeList, updateIssueTypeId } from "../redux/typeSlice";
import { Tag } from "antd";

function TypeSelect(props) {
  const dispatch = useDispatch();
  const { typeList } = useSelector((state) => state.type);
  const colorArr = [
    "#108ee9",
    "#2db7f5",
    "#f50",
    "green",
    "#87d068",
    "blue",
    "red",
    "purple",
  ];

  const [tagContainer, setTagContainer] = useState([]);

  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList());
    }
    if (typeList.length) {
      const arr = [];
      arr.push(
        <Tag
          color="magenta"
          value="all"
          key="all"
          style={{ cursor: "pointer" }}
          onClick={() => changeType("all")}
        >
          全部
        </Tag>
      );
      typeList.forEach((item, index) => {
        arr.push(
          <Tag
            color={colorArr[index % colorArr.length]}
            value={typeList[index]._id}
            key={typeList[index]._id}
            style={{ cursor: "pointer" }}
            onClick={() => changeType(typeList[index]._id)}
          >
            {typeList[index].typeName}
          </Tag>
        );
      });
      setTagContainer(arr);
    }
  }, [typeList]);

  function changeType(typeId) {
    if (location.pathname === "/issues") {
      dispatch(updateIssueTypeId(typeId));
    } else if (location.pathname === "/books") {
      // 书籍
    }
  }

  return <div>{tagContainer}</div>;
}

export default TypeSelect;
