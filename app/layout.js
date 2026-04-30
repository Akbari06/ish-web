import "./globals.css";

export const metadata = {
  title: "Ishtiaque's Portfolio",
  description: "Personal dev/tech portfolio site",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
