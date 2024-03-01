/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, CardActions, CardHeader, Card, CardContent } from "@mui/material";
import { ReactNode } from "react";

interface CustomCardProps {
  titleIcon?: ReactNode;
  titleAction?: ReactNode;
  title?: ReactNode;
  subTitle?: string;
  content?: ReactNode;
  footerAction?: ReactNode;
}

export default function CustomCard(props: CustomCardProps) {
  return (
    <Card>
      <CardHeader
        style={{ paddingLeft: 0 }}
        avatar={
          <div id="titleIcon" style={{ marginRight: -16 }}>
            {props.titleIcon}
          </div>
        }
        action={props.titleAction}
        title={props.title}
        subheader={props.subTitle}
      />
      <CardContent style={{ padding: 8 }}>{props.content}</CardContent>
      <CardActions>
        <Box style={{ width: "100%", textAlign: "right" }}>
          {props.footerAction}
        </Box>
      </CardActions>
    </Card>
  );
}
