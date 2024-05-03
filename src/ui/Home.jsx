import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser'
import Button from './Button';
function Home() {

  const username = useSelector(state=>state.user.userName)
  return (
    <div className='my-10 text-center px-4'>
      <h1 className="text-xl font-semibold  mb-4">
        The best pizza.
        <br />
        <span className="text-yellow-500">

        Straight out of the oven, straight to you.
        </span>
      </h1>
      {
        username === '' ?
      <CreateUser/>
      :
      <div>
        <Button type='primary' to='/menu'>Continue ordering {username}</Button>
      </div>
      }
    </div>
  );
}

export default Home;
