import { Suspense, ComponentType, ElementType } from 'react';

// project imports
import { Loader } from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

/**
 * HOC que envuelve componentes en un Suspense con un Loader de fallback.
 * T representa las props del componente original.
 */
const Loadable = <P extends object>(Component: ComponentType<P>) => (props: P) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;