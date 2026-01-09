import { Toaster } from 'react-hot-toast';

const HotToaster = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        // Custom styles for success toasts
        success: {
          duration: 3000,
          style: {
            background: 'hsl(var(--background))',
            border: '1px solid hsl(142.1 76.2% 36.3%)',
          },
          iconTheme: {
            primary: 'hsl(142.1 76.2% 36.3%)',
            secondary: 'hsl(var(--background))',
          },
        },
        // Custom styles for error toasts
        error: {
          duration: 5000,
          style: {
            background: 'hsl(var(--background))',
            border: '1px solid hsl(var(--destructive))',
          },
          iconTheme: {
            primary: 'hsl(var(--destructive))',
            secondary: 'hsl(var(--background))',
          },
        },
      }}
    />
  );
};

export default HotToaster;
