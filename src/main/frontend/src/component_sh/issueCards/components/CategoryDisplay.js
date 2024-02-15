/* eslint-disable react/prop-types */
import { Card, Grid } from "@mui/material";
import axios from "axios";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import React, { useEffect, useState } from "react";

function PurposeList(props) {
  const [purList, setPurList] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleDeleteSubcategory = (subcategory) => {
    setSelectedSubCategory(subcategory);
    deleteSubcategory();
  };
  const deleteSubcategory = () => {
    alert("삭제 하시겠습니까?");
    axios({
      method: "delete",
      url: "/pur/deleteSubcategory.do",
      data: { category: selectedCategory, subcategory: selectedSubCategory },
    })
      .then((res) => {
        console.log("소분류 삭제 성공 삭제 성공 삭제 성공 삭제 성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "/pur/list.do",
    })
      .then((res) => {
        console.log(res.data);
        console.log("성공 성공 성공 성공 성공 성공");
        setPurList(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("실패 실패 실패 실패 실패 실패");
      });
  }, [newCategory]);

  const columns = [
    { name: "소분류", align: "center" },
    { name: "삭제", align: "center" },
  ];

  const generateRows = () => {
    if (!selectedCategory) return [];
    const selectedCategoryItems =
      purList.find((pur) => pur.purposeCategory === selectedCategory)?.purposeItem || [];

    return selectedCategoryItems.map((item, index) => ({
      소분류: <SoftTypography variant="body1">{item}</SoftTypography>,
      삭제: <SoftButton onClick={() => handleDeleteSubcategory(item)}>삭제</SoftButton>,
    }));
  };

  return (
    <div>
      <CategoryDisplay
        purList={purList}
        handleChange={handleChange}
        newCategory={newCategory}
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        columns={columns}
        rows={generateRows()}
      />
    </div>
  );
}

function CategoryDisplay({ purList, selectedCategory, handleCategoryClick, columns, rows }) {
  return (
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
            <SoftBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              style={{
                backgroundColor: selectedCategory === pur.purposeCategory ? "lightblue" : "white",
              }}
            >
              <SoftButton style={{ width: "150px" }}>{pur.purposeCategory}</SoftButton>
            </SoftBox>
          </Grid>
        ))}
      </Grid>
      <div>
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
          <Table columns={columns} rows={rows} />
        </SoftBox>
      </div>
    </Card>
  );
}

export default PurposeList;
