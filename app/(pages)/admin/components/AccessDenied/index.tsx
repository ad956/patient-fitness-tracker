import { Card } from "@nextui-org/react";

export default function AccessDenied() {
  return (
    <Card shadow="lg" className="w-full max-w-md p-6">
      <h2 className="text-xl font-bold text-center text-red-600 mb-4">
        Access Denied
      </h2>
      <p className="text-center">
        This admin page is only accessible on desktop devices. Please use a
        desktop computer to access this site.
      </p>
    </Card>
  );
}
