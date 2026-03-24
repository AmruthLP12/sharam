import { useEffect, useState } from "react";
import {  getDocuments } from "./services/db";

function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const docs = await getDocuments();
        

        setData(docs);
      } catch (err) {
        console.log(err);
      }
    };

    run();
  }, []);

  return (
    <div>
      Appwrite Working ✅
      <br />
      <br />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
