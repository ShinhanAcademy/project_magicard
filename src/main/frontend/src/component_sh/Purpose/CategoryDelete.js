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
              handleDeleteAll();
            }}
          >
            <img src="image_sh/deleteButton.png" alt="Delete" />
          </button>
        )}
      </SoftBox>
    </>
  );
}

export default CategoryDelete;
