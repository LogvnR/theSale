import emailjs from "@emailjs/browser";
import { useState } from "react";
import { clientEnv } from "../env/schema.mjs";

interface EmailProps {
  name: string;
  quantity: number;
  language: string;
}

const useEmail = ({ name, quantity, language }: EmailProps) => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const email = () => {
    emailjs
      .send(
        String(clientEnv.NEXT_PUBLIC_EMAIL_SERVICE_ID),
        String(clientEnv.NEXT_PUBLIC_EMAIL_TEMPLATE_ID),
        { name, quantity, language },
        String(clientEnv.NEXT_PUBLIC_EMAIL_USER_KEY)
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          setIsSuccessful(true);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  return { isSuccessful, email };
};

export default useEmail;
