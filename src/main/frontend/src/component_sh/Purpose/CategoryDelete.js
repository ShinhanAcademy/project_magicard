/* eslint-disable react/prop-types */

import React from "react";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import "./CategoryDelete.css";

function CategoryDelete({ pur, selectedCategory, handleCategoryClick, deleteElement, deleteAll }) {
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
        width="7rem"
        padding="1rem"
        p={1}
        style={{
          backgroundColor: selectedCategory === pur.purposeCategory ? "lightblue" : "white",
          position: "relative",
        }}
      >
        <SoftButton
          style={{ padding: "0rem", background: "#f8f9fa" }}
          onClick={() => handleCategoryClick(pur.purposeCategory)}
        >
          {selectedCategory === pur.purposeCategory && deleteElement === pur.purposeCategory && (
            <button
              className="allDeteleBtn"
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                handleDeleteAll();
              }}
            >
              <img src="image_sh/deleteButton.png" alt="Delete" />
            </button>
          )}
          {pur.purposeCategory}
        </SoftButton>
      </SoftBox>
    </>
  );
}

export default CategoryDelete;
