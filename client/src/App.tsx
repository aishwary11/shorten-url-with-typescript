import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { axiosInstance, formattedDate, toastError, toastSuccess } from "./common/utility";
import { urlList } from "./slice/urlSlice";

function App() {
  const [url, setUrl] = useState<string>("");
  const [dataArr, setDataArr] = useState<Url[]>([]);
  const dispatch = useDispatch();
  const urlData = useSelector((state) => state.urlReducer);
  // !urlData?.data.length ? toastError(urlData?.data.msg) : toastSuccess(urlData?.data.msg);
  useEffect(() => {
    dispatch(urlList());
  }, []);

  return (
    <div className="container mt-3">
      <ToastContainer />
      <InputGroup className="mb-3">
        <Form.Control placeholder="Enter Url" onChange={(e) => setUrl(e.target.value)} />
        <Button variant="outline-secondary" onClick={async (e) => {
          await axiosInstance.post('/shorten', { longUrl: url }).then(({ data, status }) => {
            if (status == 200) {
              toastSuccess(data?.msg);
              axiosInstance.get('/').then((res: any) => setDataArr(res.data.data));
            } else toastError(data?.msg);
          }).catch((err: Error) => toastError(err.message ?? "Something went wrong"));
        }}>
          Shorten URL
        </Button>
      </InputGroup >
      {urlData.data == undefined || !urlData?.data.length ? <p>No data</p> :
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Long Url</th>
              <th>Short Url</th>
              <th>Time</th>
              <th>Delete Post</th>
            </tr>
          </thead>
          <tbody>
            {urlData?.data.map((data: Url, i: number) =>
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{data.longUrl}</td>
                <td><a href={data.longUrl as string} target="_blank">{data.shortUrl}</a></td>
                <td>{formattedDate(data.createdAt)}</td>
                <td><Button variant='danger' onClick={async (e) => axiosInstance.delete(`/${data.urlCode}`).then(({ data, status }) => {
                  if (status == 200) {
                    toastSuccess(data?.msg);
                    axiosInstance.get('/').then((res: any) => setDataArr(res.data.data));
                  } else toastError(data?.msg);
                }).catch((err: Error) => toastError(err.message ?? "Something went wrong"))
                }>Delete Post</Button></td>
              </tr>)}
          </tbody>
        </Table>
      }
    </div>
  );
}

export default App;
