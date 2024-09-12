import { axiosInstance, formattedDate, toastError, toastSuccess } from '@/common/utils.js';
import { urlList } from '@/slice/urlslice.js';
import { AppDispatch, Url } from '@/types.js';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const TableList = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = async (urlCode: string) => {
    const {
      data: { status, msg },
    } = await axiosInstance.delete(`/url/${urlCode}`);
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
        {props.urlData.data.map((data: Url, i: number) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>
              <p>{data.longUrl}</p>
            </td>
            <td>
              <a
                href={data.longUrl}
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
  );
};

export default React.memo(TableList);
