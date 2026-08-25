import { type FormEvent, useState } from "react";
import brandLogo from "./intly-logo-image.png";

export const IntlyWaitlist = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    await fetch("https://submit-form.com/NlPk7tKvP", {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors",
    });

    setIsSubmitted(true);
  };

  return (
    <main className="flex flex-col min-h-[844px] items-center justify-center p-4 relative bg-[#1800ad]">
      <section
        className="items-start gap-[13px] px-6 py-11 bg-[#1800ad] flex flex-col relative self-stretch w-full flex-[0_0_auto]"
        aria-labelledby="waitlist-heading"
      >
        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
          <img className="relative h-14 w-auto" alt="Intly" src={brandLogo} />
        </div>
        <header className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
          <h1
            id="waitlist-heading"
            className="relative w-[310px] mt-[-1.00px] [font-family:'EB_Garamond-SemiBold',Helvetica] font-semibold text-white text-[28px] tracking-[-0.50px] leading-9"
          >
            Create spaces, don&apos;t just save them.
          </h1>
          <p className="relative w-[310px] [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-white text-[17px] tracking-[0] leading-6">
            A toolkit for collectors, curators and design lovers.
          </p>
        </header>
        {isSubmitted ? (
          <p
            id="request-status"
            role="status"
            className="relative self-stretch [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-white text-[14px] tracking-[0] leading-[normal]"
          >
            You're on the list — we'll be in touch.
          </p>
        ) : (
          <form
            className="items-center gap-2.5 pt-3 pb-0 px-0 flex flex-col relative self-stretch w-full flex-[0_0_auto]"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col items-start gap-1.5 w-full flex-[0_0_auto] relative self-stretch">
              <label
                htmlFor="email"
                className="mt-[-1.00px] [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-white text-[10px] tracking-[0] leading-[normal] relative self-stretch"
              >
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
                autoComplete="email"
                className="w-full h-9 px-2 bg-[#1800ad] border border-solid border-[#4030cc] relative self-stretch text-white [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-[14px] tracking-[0] leading-[normal]"
              />
            </div>
            <button
              type="submit"
              className="flex w-[155px] h-[27px] items-center justify-center relative bg-[#050097] cursor-pointer"
            >
              <span className="relative w-fit [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-[#1067ff] text-[9px] tracking-[0] leading-[normal]">
                Request Access
              </span>
            </button>
          </form>
        )}
      </section>
    </main>
  );
};
