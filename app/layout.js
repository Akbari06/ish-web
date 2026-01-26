import "./globals.css";

export const metadata = {
  title: "Dev Portfolio",
  description: "Personal dev/tech portfolio site"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
