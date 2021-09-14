
import './App.css';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function District(props) {
  const [values, setValues] = useState([]);
  const [stateValue, setstateValue] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  let object = { "0": 5, "1": 7, "2": 4, "3": 6, "4": 7, "5": 8, "6": 12, "7": 11, "8": 2 }
  let stateSelected = props.stateSelected;
  useEffect(() => {
    setstateValue(false);

    fetch('https://data.covid19india.org/v4/min/data.min.json').then(x => x.json()).then(x => {

      Object.entries(x).map(([key, val]) => {
        // console.log(val.meta.last_updated)      ;
        //console.log(val)
        if (key == stateSelected) {
          let array = [];
          Object.entries(val.districts).map(value => {
            array.push(value);
          })
          setSelectedValue(array);
          setstateValue(true);
        }
      })
      setValues(x);
    });
  }, [stateSelected])
  const TableDisplay = () => {
    //  console.log(selectedValue)  
    let display = <div></div>
    if (stateValue) {
      display = (<div>
        <br />
        <Table className="table table-striped">
          <thead>
            <tr>
              <th>
                District
              </th>
              <th>
                Confirmed
              </th>
              <th>
                Active
              </th>
              <th>
                Recovered
              </th>
              <th>
                Deceased
              </th>
              <th>
                Tested
              </th>
            </tr>
          </thead>
          {/* {JSON.stringify(selectedValue[0])} */}
          <tbody>
            {selectedValue.map(value => {
              return (
                <tr key={value[0]}>
                  <td>
                    {value[0]}
                  </td>
                  <td>
                    {value[1].total.confirmed}
                  </td>
                  <td>
                    {value[1].total.confirmed ? !(value[1].total.deceased) ? (Number(value[1].total.confirmed) - Number(value[1].total.recovered)) : (Number(value[1].total.confirmed) - (Number(value[1].total.recovered) + Number(value[1].total.deceased))) : 0}
                  </td>
                  <td>
                    {value[1].total.recovered ? Number(value[1].total.recovered) : 0}
                  </td>
                  <td>
                    {!(value[1].total.deceased) ? 0 : value[1].total.deceased}
                  </td>
                  <td>
                    -
              </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>)
    }
    else {
      display = <div></div>
    }
    return display;
  }
  return (
    <div>
      <TableDisplay />
    </div>
  );
}

export default District;
