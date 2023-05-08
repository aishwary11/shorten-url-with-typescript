import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ToastContainer } from "react-toastify";
import { axiosInstance, formattedDate, toastError, toastSuccess } from "./common/utility";

function App() {
  const [url, setUrl] = useState<string>("");
  const [dataArr, setDataArr] = useState<Url[]>([]);

  useEffect(() => {
    axiosInstance.get('/').then(({ data }) => {
      setDataArr(data.data);
      toastSuccess(data.msg);
    });
  }, []);

  return (
    <div className="container mt-3">
      <ToastContainer />
      <InputGroup className="mb-3">
        <Form.Control placeholder="Enter Url" onChange={(e) => setUrl(e.target.value)} />
        <Button variant="outline-secondary" onClick={async (e) => {
          await axiosInstance.post('/shorten', { longUrl: url }).then(({ data, status }) => {
            if (status == 200) toastSuccess(data?.msg);
            else toastError(data?.msg);
          }).catch((err) => toastError(err ?? "Something went wrong"));
          await axiosInstance.get('/').then((res) => setDataArr(res.data.data));
        }}>
          Shorten URL
        </Button>
      </InputGroup >
      {dataArr == undefined || !dataArr.length ? <p>No data</p> :
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Long Url</th>
              <th>Short Url</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {dataArr.map((data, i) =>
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{data.longUrl}</td>
                <td><a href={data.longUrl as string} target="_blank">{data.shortUrl}</a></td>
                <td>{formattedDate(data.createdAt)}</td>
              </tr>)}
          </tbody>
        </Table>
      }
    </div>
  );
}

export default App;
