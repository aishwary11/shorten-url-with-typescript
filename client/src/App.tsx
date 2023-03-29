import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ToastContainer } from "react-toastify";
import { Domain, HOST, URL } from "./common/types";
import { axiosInstance, formattedDate, toastError, toastSuccess } from "./common/utility";

function App() {
  const [url, setUrl] = useState<string>("");
  const [dataArr, setDataArr] = useState<URL[]>([]);

  useEffect(() => {
    axiosInstance.get('/').then(({ data }) => {
      setDataArr(data.urls);
      toastSuccess(data.msg);
    });
  }, []);

  let something: Record<Domain, HOST> = {
    '.com': { pathname: "www", url: "http" },
    ".in": { pathname: "www", url: "http" }
  };
  console.log(something['.com']);

  return (
    <>
      <ToastContainer />
      <InputGroup className="mb-3">
        <Form.Control placeholder="Enter Url" onChange={(e) => setUrl(e.target.value)} />
        <Button variant="outline-secondary" onClick={async (e) => {
          const { data, status } = await axiosInstance.post('/shorten', { longUrl: url });
          if (status == 200) toastSuccess(data?.msg ?? "Data saved");
          else toastError(data?.msg ?? "Something went wrong");
          const getUrls = await axiosInstance.get('/');
          if (getUrls) setDataArr(getUrls.data.urls);
        }}>
          Shorten URL
        </Button>
      </InputGroup>
      {!dataArr.length ? <p>No data</p> :
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
                <td><a href={data.longUrl} target="_blank">{data.shortUrl}</a></td>
                <td>{formattedDate(data.createdAt)}</td>
              </tr>)}
          </tbody>
        </Table>
      }
    </>
  );
}

export default App;
