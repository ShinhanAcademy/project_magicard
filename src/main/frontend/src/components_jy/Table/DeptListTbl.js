import axios from "axios";
import { useEffect, useState } from "react";
import DeptDetail from "./DeptDetail";

function DeptListTbl(props) {
  const [deptList, setDeptList] = useState([]);
  const [departmentId, setDepartmentId] = useState();

  useEffect(() => {
    axios({
      method: "Get",
      url: "/rest/departments/list",
    })
      .then((res) => {
        setDeptList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditClick = (departmentId) => {
    //console.log("Selected departmentId:", departmentId);
    setDepartmentId(departmentId);
  };

  return (
    <div>
      <h1>부서</h1>
      <table>
        <thead>
          <tr>
            <th>부서</th>
            <th>부서장</th>
            <th>총인원</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {deptList.map((dept) => (
            <tr key={dept.departmentId}>
              <td>{dept.departmentId}</td>
              <td>부서장</td>
              <td>총인원</td>
              <td>
                <button onClick={() => handleEditClick(dept.departmentId)}>수정하기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {departmentId && <DeptDetail departmentId={departmentId} />}
    </div>
  );
}

export default DeptListTbl;
