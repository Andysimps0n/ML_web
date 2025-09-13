import Papa from "papaparse";
import { use, useEffect, useState } from "react";


function useLoadData() {
  const [data, setData] = useState(null);
  useEffect(()=>{

      Papa.parse("/subset2.csv", {
        download: true,
        header: true,
        complete: function(results) {
          setData(results.data);
        }
      })


  },[])

  return data;
}

export {useLoadData};