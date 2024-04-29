import css from './Layout.module.css';  
import Navigation  from '../Navigation/Navigation';

export default function Layout({ children }) {
    return (
      <div className={css.container}>
        <Navigation />
        {children}
      </div>
    );
}