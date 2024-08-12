import { useEffect, useState } from "react";
import { Card, Pagination } from "antd";
import PageHeader from "../components/PageHeader";
import TypeSelect from "../components/TypeSelect";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBookByPageApi } from "../api/book";

import styles from "../css/Books.module.css";

const { Meta } = Card;

function Books(props) {
  const navigate = useNavigate();
  const { bookTypeId } = useSelector((state) => state.type);

  const [bookInfo, setBookInfo] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  function handlePageChange(current, pageSize) {
    setPageInfo({
      current,
      pageSize,
    });
  }

  useEffect(() => {
    async function fetchData() {
      let params = {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize,
      };
      if (bookTypeId !== "all") {
        params.typeId = bookTypeId;
        params.current = 1;
      }

      const { data } = await getBookByPageApi(params);
      setBookInfo(data.data);
      setPageInfo({
        current: data.currentPage,
        pageSize: data.eachPage,
        total: data.count,
      });
    }

    fetchData();
  }, [bookTypeId, pageInfo.current, pageInfo.pageSize]);

  const bookData = [];
  if (bookInfo.length) {
    bookInfo.forEach((item, index) => {
      bookData.push(
        <Card
          hoverable
          style={{ width: 200, marginBottom: 30 }}
          cover={
            <img
              alt="example"
              style={{
                width: 160,
                height: 200,
                margin: "auto",
                marginTop: 10,
              }}
              src={bookInfo[index]?.bookPic}
            />
          }
          key={index}
          onClick={() => navigate(`/bookDetail/${bookInfo[index]._id}`)}
        >
          <Meta title={bookInfo[index]?.bookTitle} />
          <div className={styles.numberContainer}>
            <div>浏览数：{bookInfo[index]?.scanNumber}</div>
            <div>评论数：{bookInfo[index]?.commentNumber}</div>
          </div>
        </Card>
      );
    });
    if (bookInfo.length % 5 !== 0) {
      var blank = 5 - (bookInfo.length % 5);
      for (let i = 1; i <= blank; i++) {
        bookData.push(
          <div
            style={{ width: 220, marginBottom: 20 }}
            key={i * Math.random()}
          ></div>
        );
      }
    }
  }

  return (
    <div>
      <PageHeader title="最新资源">
        <TypeSelect />
      </PageHeader>
      <div className={styles.bookContainer}>{bookData}</div>
      <div className="paginationContainer">
        {bookData.length > 0 ? (
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            {...pageInfo}
            onChange={handlePageChange}
          />
        ) : (
          <div
            style={{
              fontSize: "26px",
              fontWeight: "200",
            }}
          >
            该分类下暂无书籍
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;
