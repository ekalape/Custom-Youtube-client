import './styles.scss';

export const Loader = () => {
  return (
    <div className='loader-container'>
      <div className='ring'></div>
      <div className='ring'></div>
      <div className='ring'></div>
      <h2>Loading...</h2>
    </div>
  );
};
