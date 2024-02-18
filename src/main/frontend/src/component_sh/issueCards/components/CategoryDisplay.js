/* eslint-disable react/prop-types */
import { Card, Grid } from "@mui/material";
import axios from "axios";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import React, { useEffect, useState } from "react";
import "./CategoryDisplay.css";

function PurposeList() {
  const [purList, setPurList] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteElement, setDeleteElement] = useState("");

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
    alert("전체 삭제 ");
    console.log(categorytest);
    console.log("여기까지는 오는것인가>>");
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
  };

  const deletepurposeItem = (purposeItem) => {
    alert("삭제 하시겠습니까?");
    console.log(selectedCategory, purposeItem);
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
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "/pur/list",
    })
      .then((res) => {
        setPurList(res.data);
      })
      .catch((err) => {
        console.log(err);
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
      삭제: (
        <SoftButton onClick={() => handleDeletepurposeItem(item)}>
          <span style={{ fontSize: "16px" }}>삭제</span>
        </SoftButton>
      ),
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
        deleteElement={deleteElement}
        handleDeletepurposeItem={handleDeletepurposeItem}
        deleteAll={deleteAll} // deleteAll 함수를 props로 전달
      />
    </div>
  );
}

function CategoryDisplay({
  purList,
  selectedCategory,
  handleCategoryClick,
  columns,
  rows,
  deleteElement,
  handleDeletepurposeItem,
  deleteAll,
}) {
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
            <CategoryItem
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

function CategoryItem({
  pur,
  selectedCategory,
  handleCategoryClick,
  deleteElement,
  handleDeletepurposeItem,
  deleteAll,
}) {
  const handleDeleteAll = () => {
    deleteAll(pur.purposeCategory); // 대분류 정보를 함께 전달하여 deleteAll 함수 호출
  };

  return (
    <>
      <SoftBox
        borderRadius="lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        style={{
          backgroundColor: selectedCategory === pur.purposeCategory ? "lightblue" : "white",
          position: "relative",
        }}
      >
        <SoftButton
          style={{ width: "150px" }}
          onClick={() => handleCategoryClick(pur.purposeCategory)}
        >
          {pur.purposeCategory}
        </SoftButton>
        {selectedCategory === pur.purposeCategory && deleteElement === pur.purposeCategory && (
          <button
            className="allDeteleBtn"
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링 방지
              handleDeleteAll(); // 대분류 정보를 전달하여 handleDeleteAll 함수 호출
            }}
          >
            <img src="image_sh/deleteButton.png" alt="Delete" />
          </button>
        )}
      </SoftBox>
    </>
  );
}

export default PurposeList;
