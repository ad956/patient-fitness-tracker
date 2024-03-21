import { Html } from "@react-email/html";
import { getCurrentDateFormatted } from "@/app/utils/getDate";

export default function WelcomeEmail(name: string, otp: string) {
  return (
    <Html>
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "45px 30px 60px",
          background: "#f4f7ff",
          backgroundImage:
            "url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "800px 452px",
          backgroundPosition: "top center",
          fontSize: "14px",
          color: "#434343",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <header>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr style={{ height: "0" }}>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    alt=""
                    src="https://res.cloudinary.com/dtkfvp2ic/image/upload/v1711037583/patient_yluzvs_bnz9ox.png"
                    height="30px"
                    style={{ marginTop: "15px", marginRight: "10px" }}
                  />
                  <p
                    style={{
                      fontSize: "18px",
                      lineHeight: "30px",
                      fontWeight: "400",
                      color: "#111",
                    }}
                  >
                    Patient Fitness Tracker
                  </p>
                </td>
                <td style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "30px",
                      color: "#111",
                    }}
                  >
                    {getCurrentDateFormatted()}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </header>

        <main>
          <div
            style={{
              margin: "0",
              marginTop: "70px",
              padding: "92px 30px 115px",
              background: "#ffffff",
              borderRadius: "30px",
              textAlign: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: "489px", margin: "0 auto" }}>
              <h1
                style={{
                  margin: "0",
                  fontSize: "24px",
                  fontWeight: "500",
                  color: "#1f1f1f",
                }}
              >
                Your OTP
              </h1>
              <p
                style={{
                  margin: "0",
                  marginTop: "17px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Hey {name},
              </p>
              <p
                style={{
                  margin: "0",
                  marginTop: "17px",
                  fontWeight: "500",
                  letterSpacing: "0.56px",
                }}
              >
                Thank you for choosing Patient Fitness Tracker . Use the
                following OTP to complete the verification process. OTP is valid
                for{" "}
                <span style={{ fontWeight: "600", color: "#1f1f1f" }}>
                  5 minutes
                </span>
                . Do not share this code with others.
              </p>
              <p
                style={{
                  margin: "0",
                  marginTop: "60px",
                  fontSize: "40px",
                  fontWeight: "600",
                  letterSpacing: "25px",
                  color: "#ba3d4f",
                }}
              >
                {otp}
              </p>
            </div>
          </div>

          <p
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              marginTop: "90px",
              textAlign: "center",
              fontWeight: "500",
              color: "#8c8c8c",
            }}
          >
            Need help? Ask at{" "}
            <a
              href="mailto:support@patientfitnesstracker.com"
              style={{ color: "#499fb6", textDecoration: "none" }}
            >
              support@patientfitnesstracker.com
            </a>{" "}
            or visit our{" "}
            <a
              href=""
              target="_blank"
              style={{ color: "#499fb6", textDecoration: "none" }}
            >
              Help Center
            </a>
          </p>
        </main>

        <footer
          style={{
            width: "100%",
            maxWidth: "490px",
            margin: "20px auto 0",
            textAlign: "center",
            borderTop: "1px solid #e6ebf1",
          }}
        >
          <p
            style={{
              margin: "0",
              marginTop: "40px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#434343",
            }}
          >
            Patient Fitness Tracker
          </p>
          <p style={{ margin: "0", marginTop: "8px", color: "#434343" }}>
            Address 540, Vadodara, Gujarat.
          </p>
          <div style={{ margin: "0", marginTop: "16px" }}>
            <a href="" target="_blank" style={{ display: "inline-block" }}>
              <img
                width="36px"
                alt="Facebook"
                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
              />
            </a>
            <a
              href=""
              target="_blank"
              style={{ display: "inline-block", marginLeft: "8px" }}
            >
              <img
                width="36px"
                alt="Instagram"
                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
              />
            </a>
            <a
              href=""
              target="_blank"
              style={{ display: "inline-block", marginLeft: "8px" }}
            >
              <img
                width="36px"
                alt="Twitter"
                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
              />
            </a>
            <a
              href=""
              target="_blank"
              style={{ display: "inline-block", marginLeft: "8px" }}
            >
              <img
                width="36px"
                alt="Youtube"
                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
              />
            </a>
          </div>
          <p style={{ margin: "0", marginTop: "16px", color: "#434343" }}>
            Copyright © 2024 Company. All rights reserved.
          </p>
        </footer>
      </div>
    </Html>
  );
}
