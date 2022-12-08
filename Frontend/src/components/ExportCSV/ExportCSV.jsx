import { CSVLink } from 'react-csv';
import { FaFileCsv } from "react-icons/fa";
import { IconContext } from "react-icons";

const ExportCSV = ({data}) => {

const realPlotter = (input) => {
      let obj_list = [];
      input.map((input_data) => {
          for(let i=0; i<input_data.Distance.length; i++){
              let my_obj = {};
              my_obj['tree']= i+1
              my_obj['AVr']= input_data.AVr[i]
              my_obj['Distance']= input_data.Distance[i]   
              my_obj['FLs']= input_data.FLs[i]
              my_obj['FM']= input_data.AVr_Con[i] 
              my_obj['Ki']= input_data.Ki[i]
              my_obj['LoS']= input_data.LoS
              my_obj['Margin']= input_data.Margin[i]   
              my_obj['PRx']= input_data.PRx[i]
              my_obj['Vertical_Pol']= input_data.Vertical_Pol
              obj_list.push(my_obj)
          }
          return ''
      })
      return obj_list;
}

const csv_data = realPlotter([data]);

const headers = [
      {
        label: "Tree",
        key: 'tree'
      },
      {
        label: "Rain Fading[AVr]",
        key: "AVr"
      },
      {
        label: "Optimized Distance[d]",
        key: "Distance"
      },
      {
        label: "PathLoss[FLSdb]",
        key: "FLs"
      },
      {
        label: "Fade Margin[FM]",
        key: "FM"
      },
      {
        label: "Idim Constant[Ki]",
        key: "Ki"
      },
      {
        label: "Line-of-Sight[los]",
        key: "LoS"
      },
      {
        label: "Margin[M]",
        key: "Margin"
      },
      {
        label: "Received Power[PRx]",
        key: "PRx"
      },
      {
        label: "Vertical Pol[Vp]",
        key: "Vertical_Pol"
      },
]

const csvLink = {
  filename: "optimization_data.csv",
  headers: headers,
  data: csv_data
}

return (
    <IconContext.Provider
    value={{ color: 'green', size: '50px'}} >
    <div>
      <CSVLink {...csvLink}><FaFileCsv /></CSVLink>
    </div>
  </IconContext.Provider>
    )
}

export default ExportCSV