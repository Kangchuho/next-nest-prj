const OrderIndex = ({ boards }) => {
  return (
    <ul>
      {boards.map((board) => {
        return (
          <li key={board.id}>
            {board.title} - {board.discription}
          </li>
        );
      })}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/boards');

  return { orders: data };
};

export default OrderIndex;
