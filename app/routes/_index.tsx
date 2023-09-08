import type { V2_MetaFunction } from "@remix-run/node";
import { OrderForm } from "~/components/order-form";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-2xl p-4">Café</h1>
      <OrderForm />
    </div>
  );
}
