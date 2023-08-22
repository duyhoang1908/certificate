import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import mau from "./assets/mau.png";
import "./App.css";

function App() {
  const [name, setName] = useState<string>("");
  const certificateRef = useRef<any>(null);

  const exportToPDF = () => {
    const certificateContent = certificateRef.current;
    if (!certificateContent) return;

    const pdf = new jsPDF("p", "mm", "a4");

    html2canvas(certificateContent).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("exported-pdf.pdf");
    });
  };
  return (
    <>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Tên học viên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={exportToPDF}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        Download
      </button>
      <div className="mx-20 relative" ref={certificateRef}>
        <p className="absolute top-[48%] right-1/2 translate-x-1/2 font-bold text-4xl">
          {name}
        </p>

        <p className="absolute bottom-1/4 left-[20%] -translate-x-[20%] font-bold text-2xl">
          {new Date().toJSON().slice(0, 10).split("-").reverse().join("/")}
        </p>
        <img className="w-full" src={mau} alt="" />
      </div>
    </>
  );
}

export default App;
