import { useState, useEffect } from "react";
import { getUserByPointsRankApi } from "../api/user";

import ScrollItem from "./ScrollItem";
import { Card } from "antd";

function ScoreRank(props) {
  const [userRankInfo, setUserRankInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserByPointsRankApi();
      setUserRankInfo(data);
    }
    fetchData();
  }, []);

  const userPointsRankArr = [];
  if (userRankInfo.length) {
    userRankInfo.forEach((item, index) => {
      userPointsRankArr.push(
        <ScrollItem
          rank={index + 1}
          rankInfo={userRankInfo[index]}
          key={userRankInfo[index]._id}
        />
      );
    });
  }

  return <Card title="积分排行榜">{userPointsRankArr}</Card>;
}

export default ScoreRank;
