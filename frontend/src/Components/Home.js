import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Typography, Button } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import PhotoIcon from "@material-ui/icons/Photo";

function Home() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Typography variant="h6">Home component</Typography>
      <ButtonGroup variant="contained">
        <Button
          startIcon={<InfoIcon />}
          color="primary"
          size="small"
          onClick={function onClick() {
            navigate("/notes");
          }}
        >
          Go to about
        </Button>
        <Button
          startIcon={<PhotoIcon />}
          color="secondary"
          size="small"
          onClick={function onClick() {
            navigate("/courses");
          }}
        >
          Go to photos
        </Button>
      </ButtonGroup>
    </Fragment>
  );
}

export default Home;
