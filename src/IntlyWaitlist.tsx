import { type FormEvent, useId, useState } from "react";
import intlyLogoImage from "./intly-logo-image.png";

export const IntlyWaitlist = () => {
  const emailInputId = useId();
  const statusId = useId();
  const [email, setEmail] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      mode: "no-cors",
    });

    setHasSubmitted(true);
  };

  return (
    <main className="flex min-h-[844px] flex-col items-center justify-center bg-[#080809] p-4">
      <section
        aria-labelledby="waitlist-heading"
        className="relative flex w-full flex-[0_0_auto] flex-col items-center gap-8 self-stretch rounded-[32px] border-[none] bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.02)_100%),linear-gradient(0deg,rgba(27,27,31,1)_0%,rgba(13,13,15,1)_100%)] px-5 py-12 shadow-[0px_16px_32px_#00000080] backdrop-blur-md backdrop-brightness-[100%] before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded-[32px] before:p-px before:content-[''] before:[background:linear-gradient(0deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.08)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude]"
      >
        <div className="relative inline-flex h-16 flex-col items-center justify-center">
          <img
            className="relative h-16 w-[120px]"
            alt="Intly"
            src={intlyLogoImage}
          />
        </div>
        <div className="relative inline-flex flex-[0_0_auto] items-center gap-1.5 rounded-[100px] border border-solid border-[#2e2e33] px-3.5 py-2">
          <span className="relative mt-[-1px] w-fit [font-family:'Geist-SemiBold',Helvetica] text-[11px] font-semibold leading-[normal] tracking-[1.5px] text-white">
            EARLY ACCESS
          </span>
        </div>
        <header className="relative flex w-full flex-[0_0_auto] flex-col items-center gap-3 self-stretch">
          <h1
            id="waitlist-heading"
            className="relative mt-[-1px] self-stretch [font-family:'TASA_Orbiter-SemiBold',Helvetica] text-center text-[26px] font-semibold leading-[34px] tracking-[-0.5px] text-white"
          >
            Absurd amount of screenshots and zero plan?
          </h1>
          <p className="relative self-stretch [font-family:'Inter-Regular',Helvetica] text-center text-[15px] font-normal leading-[22px] tracking-[0] text-[#8e8e93]">
            Find a home for your pieces
          </p>
        </header>
        {hasSubmitted ? (
          <p
            id={statusId}
            role="status"
            className="relative self-stretch [font-family:'Inter-Regular',Helvetica] text-center text-[15px] font-normal leading-[22px] tracking-[0] text-white"
          >
            You're on the list — we'll be in touch.
          </p>
        ) : (
          <form
            action="https://submit-form.com/NlPk7tKvP"
            method="POST"
            onSubmit={handleSubmit}
            className="relative flex w-full flex-[0_0_auto] flex-col items-start gap-5 self-stretch"
          >
            <div className="relative flex w-full flex-[0_0_auto] flex-col items-start gap-2 self-stretch">
              <label
                htmlFor={emailInputId}
                className="relative mt-[-1px] self-stretch [font-family:'Geist-SemiBold',Helvetica] text-[10px] font-semibold leading-[normal] tracking-[1.2px] text-[#8e8e93]"
              >
                YOUR EMAIL
              </label>
              <input
                id={emailInputId}
                className="relative h-[50px] w-full flex-1 self-stretch rounded-xl border border-solid border-[#2e2e33] bg-zinc-900 px-4 py-0 [font-family:'Helvetica_Neue-Italic',Helvetica] text-base font-normal italic leading-[normal] tracking-[0] text-white placeholder:text-[#5c5c5e] focus:border-[#8e8e93]"
                name="email"
                placeholder="you@example.com"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <button
              className="relative flex h-12 w-full items-center justify-center self-stretch rounded-xl bg-white transition-opacity hover:opacity-90"
              type="submit"
            >
              <span className="relative w-fit [font-family:'Geist-SemiBold',Helvetica] text-sm font-semibold leading-[normal] tracking-[0] text-[#0e0e10]">
                Request access
              </span>
            </button>
          </form>
        )}
      </section>
    </main>
  );
};
