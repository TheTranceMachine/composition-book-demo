import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-[url('/images/hero_bckgr_transparent_gradient.png')] bg-no-repeat bg-cover md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] border-b border-b-slate-800"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Powerful Interface <br />
                  for complex document editing
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                  <b>Composition Book</b> empowers you to write and edit multiple pages at once. With its intuitive
                  interface, you can easily navigate between pages and organize them in a way that suits your workflow.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/workspace"
                    className="rounded-sm bg-sandwisp px-8 py-4 text-base font-semibold text-black duration-300 ease-in-out hover:bg-sandwisp/80"
                  >
                    🔥 Demo
                  </Link>
                  <Link
                    href="https://github.com/TheTranceMachine/composition-book-demo"
                    className="flex gap-x-2 rounded-sm bg-black px-6 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.9998 1.27576C7.66308 1.27576 0.902832 8.03451 0.902832 16.3728C0.902832 23.0433 5.22858 28.702 11.2271 30.6985C11.9813 30.8385 12.2583 30.371 12.2583 29.9723C12.2583 29.6123 12.2443 28.423 12.2378 27.1615C8.03783 28.0748 7.15158 25.3803 7.15158 25.3803C6.46483 23.6353 5.47533 23.1713 5.47533 23.1713C4.10533 22.2343 5.57858 22.2538 5.57858 22.2538C7.09433 22.36 7.89283 23.8095 7.89283 23.8095C9.23933 26.117 11.4246 25.45 12.2861 25.0645C12.4216 24.0888 12.8128 23.4225 13.2446 23.0455C9.89133 22.6643 6.36608 21.3695 6.36608 15.5848C6.36608 13.9365 6.95608 12.5898 7.92183 11.5323C7.76483 11.1523 7.24808 9.61676 8.06783 7.53726C8.06783 7.53726 9.33533 7.13151 12.2203 9.08476C13.4248 8.75001 14.7166 8.58176 15.9998 8.57601C17.2823 8.58176 18.5748 8.74951 19.7816 9.08426C22.6631 7.13101 23.9291 7.53676 23.9291 7.53676C24.7508 9.61601 24.2341 11.1518 24.0773 11.5318C25.0453 12.5893 25.6311 13.936 25.6311 15.5843C25.6311 21.3828 22.0993 22.6593 18.7376 23.0333C19.2793 23.5018 19.7618 24.4208 19.7618 25.829C19.7618 27.849 19.7443 29.4748 19.7443 29.972C19.7443 30.3738 20.0163 30.8445 20.7813 30.6963C26.7763 28.6978 31.0971 23.0408 31.0971 16.3728C31.0968 8.03501 24.3373 1.27601 15.9998 1.27601V1.27576Z"
                        fill="#FFFFFF"
                      />
                      <path
                        d="M6.6209 22.9515C6.58765 23.0265 6.46965 23.049 6.36215 22.9977C6.25215 22.9487 6.1909 22.8465 6.2264 22.7712C6.2589 22.6937 6.37715 22.6725 6.4864 22.7242C6.5964 22.7735 6.6589 22.8767 6.62065 22.9517L6.6209 22.9515ZM7.2324 23.6337C7.16065 23.7005 7.0199 23.6695 6.9244 23.5637C6.8254 23.4587 6.8069 23.318 6.88015 23.2502C6.95465 23.1837 7.09115 23.2152 7.19015 23.3202C7.28865 23.4267 7.30815 23.5662 7.23265 23.634L7.2324 23.6337ZM7.8279 24.503C7.7354 24.5675 7.5839 24.5072 7.4904 24.373C7.3979 24.2385 7.3979 24.0772 7.4929 24.013C7.58615 23.9485 7.7354 24.0067 7.8304 24.1397C7.9224 24.276 7.9224 24.4372 7.8279 24.5027V24.503ZM8.64315 25.3432C8.56065 25.4345 8.38415 25.41 8.25515 25.2857C8.1234 25.164 8.08665 24.9907 8.1694 24.8997C8.2534 24.8082 8.43065 24.8337 8.5604 24.9572C8.69215 25.0787 8.7319 25.2522 8.64365 25.343L8.64315 25.3432ZM9.76815 25.831C9.7314 25.9492 9.5619 26.003 9.39065 25.9525C9.2199 25.9007 9.10815 25.7625 9.14315 25.643C9.17815 25.5237 9.3489 25.468 9.52115 25.5217C9.6919 25.5732 9.80365 25.7107 9.76815 25.831ZM11.0039 25.9212C11.0081 26.0457 10.8631 26.1487 10.6839 26.1512C10.5031 26.1555 10.3569 26.0545 10.3551 25.932C10.3551 25.8062 10.4971 25.7045 10.6776 25.701C10.8569 25.6977 11.0041 25.7977 11.0041 25.921L11.0039 25.9212ZM12.1534 25.7257C12.1749 25.847 12.0501 25.9717 11.8719 26.005C11.6969 26.0375 11.5344 25.962 11.5119 25.8417C11.4904 25.7172 11.6174 25.5925 11.7924 25.5602C11.9709 25.5295 12.1309 25.6027 12.1534 25.726V25.7257Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
