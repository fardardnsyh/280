"use client";

import {HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";


export function makeClient() {
  const httpLink = new HttpLink({
    
    uri: "http://localhost:3000/api/graphql",
    fetchOptions: { cache: "no-store" },

  });


  return new ApolloClient({
    
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}