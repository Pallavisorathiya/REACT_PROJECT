import loader from '../assets/loader.gif'
import "./Loder.css"

const Loder = () => {
  return (
    <div className='loader-controls'>
      <img src={loader} alt="loader" />
      <p className='ms-3'>Loading</p>
    </div>
  );
};

export default Loder;