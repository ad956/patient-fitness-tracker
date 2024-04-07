import React from "react";

export default function ErrorPage(error: string) {
  return (
    <section className="bg-[#f3f6fd] h-full w-full p-2 grid place-content-center">
      <h1 className="text-black text-xl tracking-wider text-font text-wrap text-center">
        <span className="text-red-500 font-bold">Error :</span> {error}. Please
        try again !
      </h1>
    </section>
  );
}
