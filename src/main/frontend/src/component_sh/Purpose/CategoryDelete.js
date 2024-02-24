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
      <div style={{ overflowWrap: "break-word" }}>
        <SoftButton
          style={{
            padding: "0rem",
            // background: "#f8f9fa",
            backgroundColor: selectedCategory === pur.purposeCategory ? "lightblue" : "#f1f3f5",
            marginLeft: "20%",
            marginBottom: "3%",
          }}
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
      </div>
    </>
  );
}

export default CategoryDelete;
