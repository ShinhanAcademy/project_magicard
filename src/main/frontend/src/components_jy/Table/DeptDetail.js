import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function DeptDetail(props) {
  const { departmentId } = props;
  const [deptDetail, setDeptDetail] = useState();

  const closeBtn = () => {
    setDeptDetail("");
  };

  useEffect(() => {
    console.log("deptDetail랜더링 후 : " + departmentId);
    axios({
      method: "Get",
      url: `/department/detailinfo/${departmentId}`,
    })
      .then((res) => {
        console.log("이것은 detail 정보" + res.data);
        setDeptDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [departmentId]);

  return (
    <>
      {deptDetail && (
        <div className="deptDetailTbl">
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginLeft: "1rem",
              color: "#2F4F4F",
            }}
          >
            부서 상세조회
          </div>
          <DeptDetailDisplay dept={deptDetail} closeBtn={closeBtn}></DeptDetailDisplay>{" "}
        </div>
      )}
    </>
  );
}

function DeptDetailDisplay(props) {
  const { closeBtn, dept } = props;
  console.log(dept);
  return (
    <div style={{ margin: "1.5rem" }}>
      <Form style={{ fontSize: "1rem" }}>
        <Form.Group as={Row} className="mb-3" controlId="topDepartmentId">
          <Form.Label column sm="1" style={{ fontWeight: "bold" }}>
            부문
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              value={dept.topDepartmentName || "없음"}
              name="topDepartmentName"
              plaintext
              style={{
                fontFamily: "ChungBukUniversity",
                color: dept.topDepartmentName ? "" : "#CBCBCB",
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="superDepartmentId">
          <Form.Label column sm="1" style={{ fontWeight: "bold" }}>
            상위부서
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              value={dept.superDepartmentName || "없음"}
              name="superDepartmentName"
              style={{
                fontFamily: "ChungBukUniversity",
                color: dept.superDepartmentName ? "" : "#CBCBCB",
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="departmentId">
          <Form.Label column sm="1" style={{ fontWeight: "bold" }}>
            부서
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              value={dept.departmentName || "없음"}
              name="departmentName"
              style={{
                fontFamily: "ChungBukUniversity",
                color: dept.departmentName ? "" : "#CBCBCB",
              }}
            />
          </Col>
        </Form.Group>

        <div style={{ marginLeft: "8rem" }} className="detailbtn">
          <button type="button" onClick={closeBtn}>
            확인
          </button>
        </div>
        {/* </Link> */}
      </Form>
    </div>
  );
}

export default DeptDetail;
