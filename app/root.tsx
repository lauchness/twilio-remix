import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default function App() {
  return (
    <PageWrapper>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </PageWrapper>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.log({ error });
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <PageWrapper>
        <h1 className="text-2xl p-4">Something went wrong</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </PageWrapper>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = "Unknown error";
  // if (isDefinitelyAnError(error)) {
  //   errorMessage = error.message;
  // }

  return (
    <PageWrapper>
      <h1 className="text-2xl p-4">Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </PageWrapper>
  );
}
