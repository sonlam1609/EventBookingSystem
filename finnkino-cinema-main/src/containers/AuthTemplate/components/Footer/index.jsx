import { Link } from "react-router-dom";

// Material UI
import { Typography } from "@mui/material";

// Scss
import "./style.scss";

const Footer = () => (
  <Typography variant="body2" align="center" className="auth-footer">
    Copyright &copy;{" "}
    <Link to="/" style={{ color: "#fff" }}>
      Finnkino
    </Link>
    {", "}
    {new Date().getFullYear()}
  </Typography>
);

export default Footer;
