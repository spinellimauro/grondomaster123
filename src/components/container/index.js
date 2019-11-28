import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export const SimpleContainer = props => {
  const { children } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <Typography component="div" style={{ backgroundColor: "#cfe8fc" }}>
          {children}
        </Typography>
      </Container>
    </React.Fragment>
  );
};
