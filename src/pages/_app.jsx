import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Layout from '@/components/Layout'
import { Toaster } from "@/components/ui/sonner"

import '@/styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default MyApp;
