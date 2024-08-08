import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/create">
        <button>Create Room</button>
      </Link>
      <Link to="/join">
        <button>Join Room</button>
      </Link>
    </div>
  );
};

export default Home;
