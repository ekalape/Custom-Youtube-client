import { CSSProperties } from 'react';
import './styles.scss';
import { animated } from '@react-spring/web';

type FilterPropsType = {
  animStyle: CSSProperties;
  close: () => void;
};

export function FiltersComponent(props: FilterPropsType) {
  return (
    <animated.div
      className={`container bg-white/50 absolute z-20  filters__container flex flex-col
    items-center `}
      style={props.animStyle}>
      <button
        onClick={props.close}
        className=' w-10 relative top-3 left-3 border-2 px-3 py-1
        flex items-center justify-center text-center duration-300 self-start
         border-white rounded-full hover:border-red-500 hover:text-red-500'>
        x
      </button>
      <h1>Filters</h1>
    </animated.div>
  );
}
