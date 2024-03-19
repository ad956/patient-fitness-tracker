"use client";
import { Button, Card } from "@nextui-org/react";
import domtoimage from "dom-to-image";
import { useQRCode } from "next-qrcode";

import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";

interface QRCodeProp {
  text: string;
}

export default function QRCode({ text }: QRCodeProp) {
  const { SVG } = useQRCode();

  const handleDownloadCard = () => {
    const cardElement = document.getElementById("qr-code-card");

    if (cardElement) {
      domtoimage
        .toPng(cardElement)
        .then((dataUrl: string) => {
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "card.png"; // Set the filename for the downloaded file
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch((error: any) => {
          console.error("Error downloading card:", error);
        });
    } else {
      console.error("Card element not found.");
    }
  };
  return (
    <>
      <Card
        id="qr-code-card"
        isBlurred
        shadow="lg"
        radius="lg"
        className="h-2/5 w-3/6 p-5 flex flex-col justify-center items-center"
      >
        <SVG
          text={text}
          options={{
            margin: 2,
            width: 180,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          }}
        />
      </Card>
      <Button
        color="danger"
        startContent={<MdOutlineFileDownload size={22} />}
        className=""
        onClick={handleDownloadCard}
      >
        Download QR Code
      </Button>
    </>
  );
}
