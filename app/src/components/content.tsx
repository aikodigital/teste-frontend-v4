import { Bounce, ToastContainer } from 'react-toastify';
import { cn } from '@/lib/utils';

import { useTheme } from './theme-provider';
import Header from './header';
import Footer from './footer';
interface Props {
  children: React.ReactNode;
  className?: string;
}
const Content: React.FC<Props> = ({ children, className }) => {
  const { theme } = useTheme();
  return (
    <section className="w-full h-full">
      <Header />
      <section
        className={cn(
          'min-h-[90vh] w-[90%] m-[auto] bg-background text-foreground pb-[60px]',
          className
        )}
      >
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          theme={theme}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Bounce}
        />
      </section>
      <Footer />
    </section>
  );
};

export default Content;
