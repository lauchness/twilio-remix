import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import type { action } from "~/routes/action.order";

interface OrderFormProps {}

export const OrderForm: FC<OrderFormProps> = ({}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      formRef.current?.reset();
    }
  }, [fetcher]);

  const message =
    typeof fetcher.data !== "undefined"
      ? fetcher.data?.success
        ? `You ordered "${fetcher.data.order}"`
        : fetcher.data?.message
      : null;

  return (
    <fetcher.Form
      action="/action/order"
      method="post"
      ref={formRef}
      className="max-w-sm p-4"
    >
      <div className="flex flex-col w-full gap-4">
        <h2 className="leading-[19px] font-medium">Make Your Order</h2>

        <label htmlFor="order" className="sr-only">
          Order
        </label>
        <input
          id="order"
          name="order"
          type="text"
          placeholder="Tuna Salad Sandwich"
          className="p-2 border border-gray-400 rounded"
        />
        <button className="w-full bg-gray-400 rounded px-4 py-2" type="submit">
          Submit
        </button>
      </div>

      {message ? (
        <div
          className={clsx(
            "text-white rounded px-6 py-4",
            {
              "bg-green-700": fetcher.data?.success,
            },
            {
              "bg-red-700": !fetcher.data?.success,
            }
          )}
        >
          {message}
        </div>
      ) : null}
    </fetcher.Form>
  );
};
