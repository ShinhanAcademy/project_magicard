import { Select, outlinedInputClasses, selectClasses } from "@mui/material";
import { styled } from "@mui/system";

export const CustomSelect = styled(Select)`
  width: 150px;
  height: 40px;
  color: blue;
  border-color: red;

  & .${selectClasses.icon} {
    color: red;
  }

  & .${outlinedInputClasses.notchedOutline} {
    border-color: red;
  }
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: red;
  }

  &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
    border-color: green !important;
  }
`;
