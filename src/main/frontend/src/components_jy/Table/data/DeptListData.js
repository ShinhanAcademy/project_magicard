/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images

function MemberNum({ num }) {
  return <p>{num} 명</p>;
}

function Function({ team }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftBox mr={1}>
        <SoftTypography variant="button" fontWeight="bold" color="text">
          {team}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Manager({ name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

const DeptListData = {
  columns: [
    { name: "부서명", align: "left" },
    { name: "부서장", align: "center" },
    { name: "총인원", align: "center" },
    { name: "수정", align: "center" },
  ],

  rows: [
    {
      부서명: <Function team="회계팀" />,
      부서장: <Manager name="광광스" email="gg@aa.com" />,

      총인원: <MemberNum num="10" />,
      수정: (
        <SoftTypography
          component="button"
          variant="caption"
          fontWeight="medium"
          style={{
            backgroundColor: "transparent",
            border: "0",
          }}
        >
          수정하기
        </SoftTypography>
      ),
    },
  ],
};

export default DeptListData;
