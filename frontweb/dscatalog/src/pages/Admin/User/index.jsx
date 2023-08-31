import { useEffect, useState } from 'react';
import { requestBackend } from '../../../util/requests';

const Users = () => {
  const [page, setPage] = useState();

  useEffect(() => {
    const params = {
      url: '/users',
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div>
      {page?.content.map((item) => (
        <p key={item.id}>{item.email}</p>
      ))}
    </div>
  );
};

export default Users;
