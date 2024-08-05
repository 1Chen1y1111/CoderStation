import React from "react";
import { Card, Carousel } from "antd";
import RecommendItem from "./RecommendItem";

import styles from "../css/Recommend.module.css";

/**
 * 右侧的推荐组件
 */
function Recommend(props) {
  const bannerDataList = [
    {
      bg: "https://image-static.segmentfault.com/583/489/583489293-62e22caab8392",
      href: "https://segmentfault.com/a/1190000042203704?utm_source=sf-homepage-headline",
    },
    {
      bg: "https://image-static.segmentfault.com/248/470/2484709773-635632347923b",
      href: "https://chinaevent.microsoft.com/Events/details/0decfcda-1959-4098-891d-690825a58f9e/?channel_id%3d50%26channel_name%3dPaid-SF",
    },
    {
      bg: "https://image-static.segmentfault.com/364/971/3649718341-6355fab16df40",
      href: "https://segmentfault.com/a/1190000042666738?utm_source=sf-homepage-headline",
    },
    {
      bg: "https://image-static.segmentfault.com/422/352/422352298-6355600c6676b",
      href: "https://segmentfault.com/reco/1640000042672710?utm_source=sf-homepage-headline",
    },
  ];

  let bannerList = [];
  bannerDataList.forEach((item, index) => {
    bannerList.push(
      <div key={index}>
        <a
          className={styles.contentStyle}
          target="_blank"
          rel="noreferrer"
          style={{ background: `url(${item.bg}) center/cover no-repeat` }}
        ></a>
      </div>
    );
  });

  const recommendDataList = [
    {
      num: 1,
      title: "利用思否猫素材实现一个丝滑的轮播图（html + css + js）",
      href: "https://segmentfault.com/a/1190000042661646",
    },
    {
      num: 2,
      title: "「🌟技术探索🌟」借助 CI / CD 实现前端应用的快速回滚",
      href: "https://segmentfault.com/a/1190000042531062",
    },
    {
      num: 3,
      title: "面试说：聊聊JavaScript中的数据类型",
      href: "https://segmentfault.com/a/1190000042539876",
    },
    {
      num: 4,
      title: "单标签实现复杂的棋盘布局",
      href: "https://segmentfault.com/a/1190000042513947",
    },
  ];
  let recommendList = [];
  recommendDataList.forEach((item, index) => {
    recommendList.push(<RecommendItem key={index} recommendInfo={item} />);
  });

  return (
    <Card title="推荐内容">
      {/* 上方轮播图 */}
      <div style={{ marginBottom: 20 }}>
        <Carousel autoplay>{bannerList}</Carousel>
      </div>

      {recommendList}
    </Card>
  );
}

export default Recommend;
