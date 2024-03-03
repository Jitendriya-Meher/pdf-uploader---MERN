import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {

  const [ title, setTitle ] = useState("");
  const [ file, setFile ] = useState("");
  const [ pdfs, setPdfs ] = useState([]);

  async function submitHandler(e){

    e.preventDefault();

    try{
      console.log('title',title);
      console.log('file',file);

      const formData = new FormData();
      formData.append("title",title);
      formData.append("file",file);
      console.log('formData',formData);

      const res = await axios.post(`http://localhost:4000/upload-files`,formData,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      });

      const data = await res.data;
      setTitle("");
      setFile("");

      getPdfs();

    }
    catch(err){
      console.log(err.message);
    }
  }

  async function getPdfs(e){

    try{
      const res = await axios.get(`http://localhost:4000/get-files`);
      const data = await res.data;

      if( data.success){
        setPdfs(data.pdfs);
      }
    }
    catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    getPdfs();
  });

  const openPdf = (pdf) => {
    window.open(`http://localhost:4000/files/${pdf}`,"_blank","noreferrer");
  }

  return (
    <div className="">

      <form className=" bg-blue-200 flex justify-center items-center flex-col w-[500px] mx-auto px-10 py-8 gap-4 rounded-md" onSubmit={submitHandler}>

        <h4 className=" text-2xl font-semibold">
          Upload pdf
        </h4>

        <div className=" w-full">
          <input type="text"
          placeholder="title"
          required 
          value={title}
          className=" w-full p-1 rounded-md"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          />
        </div>
        <div className=" w-full">
          <input type="file"
          accept="application/pdf"
          required
          value={file}
          className=" w-full"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }} />
        </div>

        <button className=" w-full bg-blue-500 p-1 rounded-md">
          Submit
        </button>

      </form>

      <div className=" w-full mt-8">
        <div className=" mx-auto max-w-[1160px] flex flex-wrap gap-3">
          {
            pdfs.map((pdf) => (
              <div className=" px-6 py-4 bg-green-500 rounded-md flex flex-col gap-2" key={pdf._id}>
                <h1 className=" font-semibold font-mono">
                  Title : {pdf.title}
                </h1>
                <button onClick={() => {
                  openPdf(pdf.pdf);
                }}
                className=" bg-green-900 text-white p-2 py-1 rounded-md hover:bg-green-300 hover:text-black transition-all duration-200">
                  Show pdf
                </button>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  );
}

export default App;
