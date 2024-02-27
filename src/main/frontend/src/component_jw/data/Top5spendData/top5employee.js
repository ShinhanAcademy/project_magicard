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
  
  


  return {
    columns: [
      { name: "순위", align: "center", style: { width: '50px' }},    
      { name: "이름", align: "center" },     
      { name: "소속", align: "center" },
      { name: "지출", align: "center" },
    ],

    rows: [
      {
        순위:(
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              1
            </SoftTypography>
          ),
        이름:(
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                신서영
            </SoftTypography>
        ),
        소속:(
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                뱅킹모바일 팀
            </SoftTypography>   
        ),
        지출: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                ₩ 1,104,000
            </SoftTypography>
        ), 
      },
      {
        순위: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              2
            </SoftTypography>
          ),
        이름: <SoftTypography variant="caption" color="text" fontWeight="medium">
                노승광
            </SoftTypography>,
        소속:(
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                뱅킹금융 팀
            </SoftTypography>   
        ),
        지출: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                ₩ 754,000
            </SoftTypography>
        ), 
      },
      {
        순위: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              3
            </SoftTypography>
          ),
        이름:<SoftTypography variant="caption" color="text" fontWeight="medium">
            정문경
            </SoftTypography>,
        소속:(
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                인사 팀
            </SoftTypography>   
        ),
        지출: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                ₩ 724,000
            </SoftTypography>
        ),
      },
      {
        순위: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              4
            </SoftTypography>
          ),
        이름: <SoftTypography variant="caption" color="text" fontWeight="medium">
            민성환
            </SoftTypography>,
        소속:(
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                금융보안2 팀
            </SoftTypography>   
        ),
        지출: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                ₩ 704,000
            </SoftTypography>
        ),
      },
      {
        순위: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                5
            </SoftTypography>
          ),
        이름: <SoftTypography variant="caption" color="text" fontWeight="medium">
            정주영 
            </SoftTypography>,
        소속:(
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                전략기획 팀
            </SoftTypography>   
        ),
        지출: (
            <SoftTypography variant="caption" color="text" fontWeight="medium">
                ₩ 654,000
            </SoftTypography>
        ),
      },
     
    ],
  };
}
