import { BlogContextProvider } from "@/contexts/blogContext";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <BlogContextProvider>{children}</BlogContextProvider>;
    </body>
  );
}
