import React from "react";
import { Container } from "react-bootstrap";

export default function FooterScreen() {
  return (
    <div
      id="#footer"
      style={{
        height: "300px",
        backgroundColor: "#212529",
        position: "relative",
        color: "white",
        bottom: "0",
        clear: "both",
      }}
    >
      <Container className="d-flex justify-content-between pt-5">
        <div>
          <h4 style={{ borderBottom: "5px solid white" }} className="p-3">
            About me
          </h4>
          <div>
            <div className="my-3">Fullname: Do Ba Long</div>
            <div className="my-3">Fresher at CyberLotus</div>
          </div>
        </div>
        <div>
          <h4 style={{ borderBottom: "5px solid white" }} className="p-3">
            Contact
          </h4>
          <div>
            <div className="my-3">Email: dobalong23112000@gmail.com</div>
            <div className="my-3">
              CyberLotus Tầng 4B, Tòa nhà T6-08 Tôn Quang Phiệt, Hà Nội
            </div>
            <div className="my-3">Phone: 024.32.0000.77</div>
          </div>
        </div>
        <div>
          <h4 style={{ borderBottom: "5px solid white" }} className="p-3">
            Services
          </h4>
          <div>
            <div className="my-3">Odoo ERP – Nguồn lực doanh nghiệp </div>
            <div className="my-3">
              Giải pháp Vtiger CRM Khách hàng & Kinh doanh
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
