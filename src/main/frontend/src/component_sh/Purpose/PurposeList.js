/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Card, Grid } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import Table from "examples/Tables/Table";
import CategoryDelete from "./CategoryDelete";

function PurposeList({ modalOpen, serachItem }) {
  const [purList, setPurList] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteElement, setDeleteElement] = useState("");
  const [categoryCount, setCount] = useState("0");

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // 이미 선택된 카테고리를 다시 클릭하면 선택 해제
    } else {
      setSelectedCategory(category);
      setDeleteElement(category); // 카테고리를 클릭하면 삭제 요소 표시
    }
  };

  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleDeletepurposeItem = (purposeItem) => {
    deletepurposeItem(purposeItem);
  };

  const deleteAll = (categorytest) => {
    const confirmed = window.confirm(
      "상위 항목 삭제시 해당 하위 항목이 모두 삭제됩니다. \n삭제하시겠습니까?"
    );
    if (confirmed) {
      axios({
        method: "delete",
        url: "/pur/deleteAll",
        data: { purposeCategory: categorytest },
      })
        .then((res) => {
          setNewCategory(Date.now().toString()); // 새로 list를 부르기위해 아무 변수
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("취소되었습니다.");
    }
  };

  const deletepurposeItem = (purposeItem) => {
    const confirmed = window.confirm(" 삭제 하시겠습니까?");
    if (confirmed) {
      axios({
        method: "delete",
        url: "/pur/deletepurposeItem",
        data: { purposeCategory: selectedCategory, purposeItem: purposeItem },
      })
        .then((res) => {
          setNewCategory(Date.now().toString()); // 새로 list를 부르기위해 아무 변수
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("취소되었습니다.");
    }
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "/pur/list",
    })
      .then((res) => {
        setPurList(res.data);
        setCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [modalOpen, newCategory]);

  const columns = [
    { name: "소분류", align: "center" },
    { name: "삭제", align: "center" },
  ];

  const rows = () => {
    if (!selectedCategory) return [];
    const selectedCategoryItems =
      purList.find((pur) => pur.purposeCategory === selectedCategory)?.purposeItem || [];

    return selectedCategoryItems.map((item, index) => ({
      소분류: <SoftTypography variant="body1">{item}</SoftTypography>,
      삭제: (
        <SoftButton onClick={() => handleDeletepurposeItem(item)}>
          <span style={{ fontSize: "13px" }}>삭제</span>
        </SoftButton>
      ),
    }));
  };

  const rows2 = Array.isArray(serachItem)
    ? serachItem.map((item, index) => ({
        소분류: <SoftTypography variant="body1">{item}</SoftTypography>,
        삭제: (
          <SoftButton onClick={() => handleDeletepurposeItem(item)}>
            <span style={{ fontSize: "13px" }}>삭제</span>
          </SoftButton>
        ),
      }))
    : [];

  return (
    <Fragment>
      <p
        style={{
          fontSize: "0.8rem",
          color: "gray",
          marginLeft: "2rem",
          marginTop: "-2rem",
          marginBottom: "1rem",
        }}
      >
        전체 용도 : {categoryCount} 개
      </p>
      <Card id="delete-account" sx={{ height: "100%" }}>
        <Grid container spacing={2}>
          {purList.map((pur, index) => (
            <Grid
              item
              xs={1}
              md={1}
              key={index}
              onClick={() => handleCategoryClick(pur.purposeCategory)}
            >
              <CategoryDelete
                pur={pur}
                selectedCategory={selectedCategory}
                handleCategoryClick={handleCategoryClick}
                deleteElement={deleteElement}
                handleDeletepurposeItem={handleDeletepurposeItem}
                deleteAll={deleteAll} // deleteAll 함수를 props로 전달
              />
            </Grid>
          ))}
        </Grid>

        <div>
          {selectedCategory && (
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows()} />{" "}
            </SoftBox>
          )}
          {rows2.length > 0 && (
            <SoftBox>
              <Table columns={columns} rows={rows2} />
            </SoftBox>
          )}
        </div>
      </Card>
    </Fragment>
  );
}

export default PurposeList;
