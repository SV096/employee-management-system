import "./globals.css";
import Header from "@/components/Header";
import { EmployeeProvider } from "@/context/EmployeeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <EmployeeProvider>
          <Header />
          {children}
        </EmployeeProvider>
      </body>
    </html>
  );
}
