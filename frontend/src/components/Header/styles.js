import { Grid, Typography } from "@mui/material";
import styled from "styled-components";

export const StyledGrid = styled(Grid)`
  height: 90%;
  margin: 10px auto auto auto;
  border: 3px solid ${({ theme }) => theme.palette.background.headerOutline};
  border-radius: ${({ theme }) => theme.spacing(15)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TextGridContainer = styled(Grid)`
  width: 40%;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
`;

export const Text = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 1.9rem;
    line-height: 1.5rem;
  }
`;

export const ScoreGridContainer = styled(Grid)`
  width: 20%;
  height: 85%;
  background: ${({ theme }) => theme.palette.common.white};
  border-radius: ${({ theme }) => theme.spacing(12)};
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down("md")} {
    height: 80%;
  }
`;

export const ScoreText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.score};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    margin-bottom: 3px;
  }
`;

export const ScoreValue = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 2rem;
  }
`;

export const AvailableRooms = styled.div`
position: absolute;
color: #ffffff;
top: 0;
left: 46%;
width: 210px;
height: 120px;
overflow: hidden;
`;
