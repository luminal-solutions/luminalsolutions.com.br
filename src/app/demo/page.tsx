"use client";

import { useState } from "react";
import Head from "next/head";

export default function DemoRequestPage() {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/send-demo", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          message: formData.get("message"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Fale Conosco | Luminal Solutions</title>
      </Head>

      <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center px-4 py-12">
        <div className="bg-white text-black p-10 rounded-2xl shadow-xl w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Fale Conosco
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Entre em contato conosco diretamente através do nosso e-mail e retornaremos o mais breve possível.
          </p>

          <div className="flex justify-center">
            <a
              href="mailto:luminalcontato@gmail.com"
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#FFE566] to-[#3F87F5] rounded-xl hover:opacity-90 transition shadow-lg"
            >
              Enviar E-mail
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
