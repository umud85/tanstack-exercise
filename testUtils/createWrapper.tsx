import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type WrapperProps = {
  children: React.ReactNode
}

const createWrapper = () => {
  const queryClient = new QueryClient()
  const Wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
  Wrapper.displayName = 'QueryClientWrapper'
  return Wrapper
};

export default createWrapper;