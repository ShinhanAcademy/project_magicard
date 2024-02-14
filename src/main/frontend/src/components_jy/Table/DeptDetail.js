import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function DeptDetail(props) {
  const { departmentId } = props;
  const [deptDetail, setDeptDetail] = useState();
  const navi = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: "/rest/empdept/update.do",
      data: emp,
    }).then((res) => {
      console.log(res.data === 0 ? "성공" : "실패");
      navi("/empdept/list");
    });
  };

  //detail 정보를 위한 superdepartment id (상위조직) 추출
  useEffect(() => {
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

  const changeHandler = useCallback(
    (e) => {
      setDeptDetail({ ...deptDetail, [e.target.name]: e.target.value });
    },
    [deptDetail]
  );

  return (
    <div>
      <div
        style={{ fontSize: "1.25rem", fontWeight: "bold", marginLeft: "1rem", color: "#2F4F4F" }}
      >
        부서 상세조회
      </div>
      <DeptDetailDisplay
        dept={deptDetail}
        changeHandler={changeHandler}
        handleSubmit={handleSubmit}
      ></DeptDetailDisplay>
    </div>
  );
}

function DeptDetailDisplay(props) {
  const { dept, changeHandler, handleSubmit } = props;
  return (
    <div style={{ margin: "1.5rem" }}>
      <Form onSubmit={handleSubmit} style={{ fontSize: "1rem" }}>
        <Form.Group as={Row} className="mb-3" controlId="topDepartmentId">
          <Form.Label column sm="1" style={{ fontWeight: "bold" }}>
            부문
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              value={dept.topDepartmentName || ""}
              name="topDepartmentName"
              plaintext
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
              value={dept.superDepartmentName || ""}
              name="superDepartmentName"
              onChange={changeHandler}
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
              defaultValue={dept.departmentName || ""}
              name="departmentName"
              onChange={changeHandler}
            />
          </Col>
        </Form.Group>

        <div style={{ marginLeft: "6rem" }} className="detailbtn">
          <button type="button">저장</button>
          <button type="button">삭제</button>
        </div>
        {/* </Link> */}
      </Form>
    </div>
  );
}

export default DeptDetail;
