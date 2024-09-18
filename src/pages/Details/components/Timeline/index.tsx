import TimelineMui from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { TimelineOppositeContent } from "@mui/lab";
import { Badge } from "../../../../components/Badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Timeline = ({ equipment }: any) => {
  console.log("equipment no Timeline:", equipment);

  return (
    <Box
      minWidth="20%"
      p={0}
      height={710}
      sx={{
        overflowY: "auto",
        margin: "auto",
        width: {
          xl: "25%",
          lg: "29%",
          md: "90%",
          sm: "60%",
          xs: "90%",
        },
        border: {
          xs: "1px solid rgba(0, 0, 0, 0.2)",
          md: "none",
          lg: "none",
          xl: "none",
        },
      }}
    >
      {/* <Paper elevation={3} sx={{ borderRadius: 3 }}> */}
      <TimelineMui position="right" sx={{ margin: 0 }}>
        {equipment.states.statesResult.map(
          (e: { name: string; date: string; color: string }, index: number) => (
            <TimelineItem key={index} sx={{ paddingBottom: 0, mb: 0 }}>
              <TimelineOppositeContent color="text.secondary">
                <Badge bgColor={e.color}>{e.name}</Badge>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card variant="outlined">
                  {/* <CardHeader title={"aaaaaa"}></CardHeader> */}
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      Dia/Hora
                    </Typography>
                    <Typography>{e.date}</Typography>
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          )
        )}
      </TimelineMui>
      {/* </Paper> */}
    </Box>
  );
};
