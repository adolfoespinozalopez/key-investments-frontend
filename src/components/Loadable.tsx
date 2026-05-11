import { Suspense, ComponentType, ElementType } from 'react';

// project imports
import { Loader } from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

export const Loadable = <P extends object>(Component: ComponentType<P> | ElementType) => (props: P) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);