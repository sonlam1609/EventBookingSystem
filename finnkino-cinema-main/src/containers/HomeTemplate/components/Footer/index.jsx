import React from "react";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faSnapchat,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

// Material UI
import { Grid } from "@mui/material";

// Components
import Image from "@/components/Image";
import images from "@/assets/images";

import "./style.scss";

function Footer() {
  return (
    <footer>
      <Grid
        container
        maxWidth="lg"
        sx={{ mx: "auto" }}
        id="footer__container"
        className="container"
      >
        <Grid container className="footer__list">
          <Grid item xs={12} md={3} className="footer__list-item">
            <p className="footer__list-title">Finnkino</p>
            <a className="footer__list-link" href="https://www.finnkino.fi/en/teatterit">
              Rạp phim
            </a>
            <a className="footer__list-link" href="http://www.finnkinob2b.fi/">
              B2B
            </a>
            <a className="footer__list-link" href="https://www.finnkino.fi/en/rekry">
              Việc làm
            </a>
            <a className="footer__list-link" href="https://www.finnkino.fi/en/tietoa-finnkinosta">
              Finnkino Oy
            </a>
          </Grid>
          <Grid item xs={12} md={3} className="footer__list-item">
            <p className="footer__list-title">Chăm sóc khách hàng</p>
            <a className="footer__list-link" href="https://www.finnkino.fi/en/asiakaspalvelu/">
              Liên hệ
            </a>
            <a className="footer__list-link" href="https://www.finnkino.fi/en/faq">
              Câu hỏi thường gặp
            </a>
          </Grid>
          <Grid item xs={12} md={3} className="footer__list-item">
            <p className="footer__list-title">Web shop</p>
            <a className="footer__list-link" href="https://www.finnkino.fi/en/tietosuoja">
              Chính sách bảo mật
            </a>
            <a
              className="footer__list-link"
              href="https://www.finnkino.fi/en/verkkokauppa/verkkokaupan-kayttoehdot"
            >
              Điều khoản sử dụng
            </a>
            <a
              className="footer__list-link"
              href="https://www.finnkino.fi/en/verkkokauppa/finnkino-lab-ehdot"
            >
              Các điều khoản của Finnkino Lab
            </a>
          </Grid>
          <Grid item xs={12} lg={3} md={12} className="footer__list-item  list--social">
            <p className="footer__list-title">Mạng xã hội</p>
            <a className="footer__list-link" href="https://www.instagram.com/finnkino_fi">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a className="footer__list-link" href="https://www.instagram.com/finnkino_fi">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a className="footer__list-link" href="https://www.facebook.com/finnkino">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a className="footer__list-link" href="https://www.snapchat.com/add/finnkino">
              <FontAwesomeIcon icon={faSnapchat} />
            </a>
            <a className="footer__list-link" href="https://www.linkedin.com/company/48910/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a className="footer__list-link" href="https://www.youtube.com/finnkinosuomi">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </Grid>
        </Grid>
        <p className="footer__rights pt-5 pb-5">Finnkino Oy - All rights reserved</p>
      </Grid>
    </footer>
  );
}

export default Footer;
