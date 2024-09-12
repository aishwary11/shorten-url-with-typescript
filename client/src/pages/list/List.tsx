import { axiosInstance, toastError, toastSuccess } from '@/common/utils.js';
import TableList from '@/components/table/TableList.js';
import { urlList } from '@/slice/urlslice.js';
import { AppDispatch, RootState } from '@/types.js';
import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function List() {
  const [url, setUrl] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const urlData: any = useSelector<RootState>(state => state.url);
  useEffect(() => {
    dispatch(urlList());
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      data: { status, msg },
    } = await axiosInstance.post('/url/shorten', { longUrl: url });
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

  return (
    <div className="container-fluid p-3">
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
        {urlData != undefined && urlData.length > 0 ? <TableList urlData={urlData} /> : <p>No data</p>}
      </Form>
    </div>
  );
}
