import Papa from "papaparse";
import { use, useEffect, useState } from "react";


function useLoadData(dataSize) {
  const [data, setData] = useState(null);
  useEffect(()=>{

    

      Papa.parse(`/data${dataSize}.csv`, {
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