import { type FormEvent, useEffect, useRef, useState } from "react";
import brandLogo from "./intly-logo-image.png";

export const IntlyWaitlist = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  // The form is replaced by the success message, so move focus there rather
  // than letting it fall back to the top of the page.
  useEffect(() => {
    if (isSubmitted) {
      successRef.current?.focus();
    }
  }, [isSubmitted]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Without this guard, a double-click (or a second tap while the request
    // is still in flight on a slow connection) fires two separate POSTs —
    // the cause of the duplicate signups showing up in submissions.
    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setError(
        emailRef.current?.validity.valueMissing
          ? "Please enter your email address."
          : "Please enter a valid email address, like name@example.com.",
      );
      emailRef.current?.focus();
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await fetch("https://submit-form.com/NlPk7tKvP", {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors",
      });
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong and we couldn't add you. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col min-h-[844px] items-center justify-center pb-24 p-4 relative bg-[#1800ad]">
      <section
        className="items-start gap-[13px] px-6 pt-0 pb-11 bg-[#1800ad] flex flex-col relative self-stretch w-full flex-[0_0_auto]"
        aria-labelledby="waitlist-heading"
      >
        <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
          <img className="relative h-14 w-auto" alt="Intly" src={brandLogo} />
        </div>
        <header className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
          <h1
            id="waitlist-heading"
            className="relative w-[310px] max-w-full mt-[-1.00px] [font-family:'EB_Garamond-SemiBold',Helvetica] font-semibold text-white text-[28px] tracking-[-0.50px] leading-9"
          >
            Create spaces, don&apos;t just save them.
          </h1>
          <p className="relative w-[310px] max-w-full [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-white text-[17px] tracking-[0] leading-6">
            A toolkit for collectors, curators and design lovers.
          </p>
        </header>
        {isSubmitted ? (
          <p
            id="request-status"
            role="status"
            ref={successRef}
            tabIndex={-1}
            className="relative self-stretch [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-white text-[14px] tracking-[0] leading-[normal] focus:outline-none"
          >
            You're on the list. We'll be in touch.
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
              {/* Border was #4030cc (1.5:1 against the background); #7d72e0 meets the 3:1 needed for a field outline. */}
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError(null);
                }}
                required
                autoComplete="email"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "email-error" : undefined}
                className={`w-full h-9 px-2 bg-[#1800ad] border border-solid ${error ? "border-[#ffc2c2]" : "border-[#7d72e0]"} relative self-stretch text-white [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-[14px] tracking-[0] leading-[normal] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
              />
              {error && (
                <p
                  id="email-error"
                  role="alert"
                  className="relative self-stretch [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-[#ffc2c2] text-[12px] tracking-[0] leading-[normal]"
                >
                  {error}
                </p>
              )}
            </div>
            {/* Label was #1067ff on #050097 (3.0:1); #8fb3ff keeps the blue and reaches 6.9:1. */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-[155px] h-[27px] items-center justify-center relative bg-[#050097] cursor-pointer disabled:opacity-60 disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="relative w-fit [font-family:'EB_Garamond-Regular',Helvetica] font-normal text-[#8fb3ff] text-[9px] tracking-[0] leading-[normal]">
                {isSubmitting ? "Sending…" : "Request Access"}
              </span>
            </button>
          </form>
        )}
      </section>
    </main>
  );
};
