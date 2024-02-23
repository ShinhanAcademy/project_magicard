/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Card, Grid } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import Table from "examples/Tables/Table";
import CategoryDelete from "./CategoryDelete";

function PurposeList({ modalOpen, searchItem }) {
  const [purList, setPurList] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteElement, setDeleteElement] = useState("");
  const [categoryCount, setCount] = useState("0");
  const [searchItemResult, setSearchItemResult] = useState(searchItem);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      setDeleteElement(category);
    }
  };

  const handleDeletePurposeItem = (purposeItem) => {
    deletePurposeItem(purposeItem);
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
          setNewCategory(Date.now().toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("취소되었습니다.");
    }
  };

  const deletePurposeItem = (purposeItem) => {
    const confirmed = window.confirm(" 삭제 하시겠습니까?");
    if (confirmed) {
      axios({
        method: "delete",
        url: "/pur/deletepurposeItem",
        data: { purposeCategory: selectedCategory, purposeItem: purposeItem },
      })
        .then((res) => {
          setNewCategory(Date.now().toString());
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
        if (res.data.length > 0) {
          setSelectedCategory(res.data[0].purposeCategory);
        }
        setSearchItemResult(searchItem);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [modalOpen, newCategory, searchItem]);

  useEffect(() => {
    if (searchItem) {
      setSelectedCategory(null);
    }
  }, [searchItem]);

  useEffect(() => {
    if (selectedCategory) {
      setSearchItemResult(null);
    }
  }, [selectedCategory]);

  const columns = [
    { name: "상위항목", align: "center" },
    { name: "하위항목", align: "center" },
    { name: "삭제", align: "center" },
  ];

  const rows = () => {
    if (searchItemResult) {
      return purList
        .flatMap((pur) => pur.purposeItem.map((item) => ({ item, category: pur.purposeCategory })))
        .filter((entry) => entry.item.includes(searchItemResult))
        .map((entry, index) => {
          return {
            상위항목: <SoftTypography variant="body1">{entry.category}</SoftTypography>,
            하위항목: <SoftTypography variant="body1">{entry.item}</SoftTypography>,
            삭제: (
              <SoftButton onClick={() => handleDeletePurposeItem(entry.item)}>
                <span style={{ fontSize: "13px" }}>삭제</span>
              </SoftButton>
            ),
          };
        });
    } else if (selectedCategory) {
      const selectedCategoryItems =
        purList.find((pur) => pur.purposeCategory === selectedCategory)?.purposeItem || [];

      return selectedCategoryItems.map((item, index) => ({
        상위항목: <SoftTypography variant="body1">{selectedCategory}</SoftTypography>,
        하위항목: <SoftTypography variant="body1">{item}</SoftTypography>,
        삭제: (
          <SoftButton onClick={() => handleDeletePurposeItem(item)}>
            <span style={{ fontSize: "13px" }}>삭제</span>
          </SoftButton>
        ),
      }));
    } else {
      return [];
    }
  };

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
      <Card id="delete-account" sx={{ height: "100%", width: "auto" }}>
        <Grid container spacing={2} style={{ width: "82rem" }}>
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
                handleDeletePurposeItem={handleDeletePurposeItem}
                deleteAll={deleteAll}
              />
            </Grid>
          ))}
        </Grid>

        <div>
          <SoftBox>
            <Table columns={columns} rows={rows()} />
          </SoftBox>
        </div>
      </Card>
    </Fragment>
  );
}

export default PurposeList;
