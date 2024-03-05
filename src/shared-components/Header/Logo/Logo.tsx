import './styles.scss';

export function Logo() {
  return (
    <div className='logo-container container flex items-center justify-center  hover:text-white text-red-600 '>
      <i className='ring'></i>
      <i className='ring'></i>
      <i className='ring'></i>

      <h2 className='text-4xl'>YT</h2>
    </div>
  );
}
