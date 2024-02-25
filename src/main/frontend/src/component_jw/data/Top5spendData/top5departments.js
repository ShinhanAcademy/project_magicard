// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "순위", align: "center", style: { width: '50px' }},    
      { name: "부서", align: "center" },     
      { name: "지출", align: "center" },
      { name: "사내 지출 비중", align: "center" },
    ],

    rows: [
      {
        순위:(
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              1
            </SoftTypography>
          ),
        부서:(
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            뱅킹금융 팀
          </SoftTypography>
        ),
        지출: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            ₩ 4,434,030
          </SoftTypography>
        ),
        "사내 지출 비중": (
          <SoftBox width="6rem" textAlign="left">
            <SoftProgress value={12} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        순위: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              2
            </SoftTypography>
          ),
        부서: <SoftTypography variant="caption" color="text" fontWeight="medium">
                인프라사업 팀
            </SoftTypography>,
        지출: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
             ₩ 3,344,000
          </SoftTypography>
        ),
        "사내 지출 비중": (
          <SoftBox width="6rem" textAlign="left">
            <SoftProgress value={6} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        순위: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              3
            </SoftTypography>
          ),
        부서:<SoftTypography variant="caption" color="text" fontWeight="medium">
            직원만족 팀
        </SoftTypography>,
        지출: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
             ₩ 3,304,000
          </SoftTypography>
        ),
        "사내 지출 비중": (
          <SoftBox width="6rem" textAlign="left">
            <SoftProgress value={5} color="info " variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        순위: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              4
            </SoftTypography>
          ),
        부서: <SoftTypography variant="caption" color="text" fontWeight="medium">
                뱅킹정보팀
            </SoftTypography>,
        지출: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
             ₩ 3,216,320
          </SoftTypography>
        ),
        "사내 지출 비중": (
          <SoftBox width="6rem" textAlign="left">
            <SoftProgress value={5} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        순위: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
            5
            </SoftTypography>
          ),
        부서: <SoftTypography variant="caption" color="text" fontWeight="medium">
                글로벌사업 팀 
            </SoftTypography>,
        지출: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
           ₩ 3,106,000
          </SoftTypography>
        ),
        "사내 지출 비중": (
          <SoftBox width="6rem" textAlign="left">
            <SoftProgress value={4} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
     
    ],
  };
}
