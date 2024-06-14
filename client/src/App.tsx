import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { axiosInstance, formattedDate, toastError, toastSuccess } from './common/utility';
import { urlList } from './slice/urlSlice';
import { AppDispatch, RootState } from './store';
import './styles.css';

function App() {
  const [url, setUrl] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const urlData: any = useSelector<RootState>(state => state.urlReducer);

  useEffect(() => {
    dispatch<any>(urlList());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      data: { status, msg },
    } = await axiosInstance.post('/shorten', { longUrl: url });
    try {
      if (status) {
        toastSuccess(msg);
        dispatch<any>(urlList());
        setUrl('');
      } else toastError(msg);
    } catch (error: Error | any) {
      toastError(error.message || 'Something went wrong');
    }
  };

  const handleDelete = async (urlCode: string) => {
    const {
      data: { status, msg },
    } = await axiosInstance.delete(`/${urlCode}`);
    try {
      if (status) {
        toastSuccess(msg);
        dispatch<any>(urlList());
      } else toastError(msg);
    } catch (err: any) {
      toastError(err || 'Something went wrong');
    }
  };

  return (
    <div className="container-fluid p-3">
      <ToastContainer
        theme="colored"
        autoClose={2000}
        position="top-right"
      />
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter Url"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            type="submit"
          >
            Shorten URL
          </Button>
        </InputGroup>
        {urlData.data != undefined && urlData.data.length > 0 ? (
          <Table
            striped
            bordered
            hover
          >
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
              {urlData.data.map((data: Url, i: number) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <a
                      href={data.longUrl}
                      target="_blank"
                    >
                      {data.longUrl}
                    </a>
                  </td>
                  <td>
                    <a
                      href={data.shortUrl}
                      target="_blank"
                    >
                      {data.shortUrl}
                    </a>
                  </td>
                  <td>{formattedDate(data.createdAt)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(data.urlCode)}
                    >
                      Delete Post
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No data</p>
        )}
      </Form>
    </div>
  );
}

export default App;
