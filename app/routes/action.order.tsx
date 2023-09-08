import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import twilio from "twilio";

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
if (!twilioAccountSid) {
  throw new Error("Missing TWILIO_ACCOUNT_SID");
}

const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
if (!twilioAuthToken) {
  throw new Error("Missing TWILIO_AUTH_TOKEN");
}

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

export async function action({ request }: ActionArgs) {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const order = form.get("order") || null;

  const twilioFromNumber = process.env.TWILIO_FROM_NUMBER;
  if (!twilioFromNumber) {
    throw new Error("Missing TWILIO_FROM_NUMBER");
  }

  const twilioToNumber = process.env.TWILIO_TO_NUMBER;
  if (!twilioToNumber) {
    throw new Error("Missing TWILIO_TO_NUMBER");
  }

  if (!order) {
    return json(
      {
        success: false,
        message: `Order: "${order}" is invalid`,
        order: "",
      },
      { status: 401 }
    );
  }

  try {
    const message = await twilioClient.messages.create({
      body: `You ordered: "${order}"`,
      from: twilioFromNumber,
      to: twilioToNumber,
    });
    console.log(message);
    return json({ success: true, message: "", order }, { status: 201 });
  } catch (error) {
    console.log(error);
    return json(
      {
        success: false,
        message: "Something went wrong",
        order: "",
      },
      { status: 500 }
    );
  }
}

export const loader = () => {
  throw new Response(null, {
    status: 404,
    statusText: "Not Found",
  });
};

export default function Order() {
  return <div>Oops... You should not see this.</div>;
}
