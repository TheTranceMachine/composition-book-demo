"use client";
import { Playwrite_CU } from "next/font/google";
import Link from "next/link";

const playwrite = Playwrite_CU({
  weight: "400",
  style: "normal",
});

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white pt-16 dark:bg-[url('/images/footr_bckgr.png')] bg-[url('/images/footr_bckgr_white.png')] md:pt-20 lg:pt-24">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-8 inline-block">
                  <div className={`text-sandwisp text-2xl ${playwrite.className}`}>Composition Book</div>
                </Link>
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Powerful Interface for complex document editing
                </p>
                <div className="flex items-center">
                  {/* <a
                    href="/"
                    aria-label="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                  >
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.1 10.4939V7.42705C12.1 6.23984 13.085 5.27741 14.3 5.27741H16.5V2.05296L13.5135 1.84452C10.9664 1.66676 8.8 3.63781 8.8 6.13287V10.4939H5.5V13.7183H8.8V20.1667H12.1V13.7183H15.4L16.5 10.4939H12.1Z"
                        fill="#3c3c4e"
                      />
                    </svg>
                  </a>
                  <a
                    href="/"
                    aria-label="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                  >
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.9831 19.25L9.82094 13.3176L4.61058 19.25H2.40625L8.843 11.9233L2.40625 2.75H8.06572L11.9884 8.34127L16.9034 2.75H19.1077L12.9697 9.73737L19.6425 19.25H13.9831ZM16.4378 17.5775H14.9538L5.56249 4.42252H7.04674L10.808 9.6899L11.4584 10.6039L16.4378 17.5775Z"
                        fill="#3c3c4e"
                      />
                    </svg>
                  </a>
                  <a
                    href="/"
                    aria-label="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-6 text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                  >
                    <svg width="18" height="14" viewBox="0 0 18 14" className="fill-current">
                      <path d="M17.5058 2.07119C17.3068 1.2488 16.7099 0.609173 15.9423 0.395963C14.5778 7.26191e-08 9.0627 0 9.0627 0C9.0627 0 3.54766 7.26191e-08 2.18311 0.395963C1.41555 0.609173 0.818561 1.2488 0.619565 2.07119C0.25 3.56366 0.25 6.60953 0.25 6.60953C0.25 6.60953 0.25 9.68585 0.619565 11.1479C0.818561 11.9703 1.41555 12.6099 2.18311 12.8231C3.54766 13.2191 9.0627 13.2191 9.0627 13.2191C9.0627 13.2191 14.5778 13.2191 15.9423 12.8231C16.7099 12.6099 17.3068 11.9703 17.5058 11.1479C17.8754 9.68585 17.8754 6.60953 17.8754 6.60953C17.8754 6.60953 17.8754 3.56366 17.5058 2.07119ZM7.30016 9.44218V3.77687L11.8771 6.60953L7.30016 9.44218Z" />
                    </svg>
                  </a> */}
                  <a
                    href="https://www.linkedin.com/in/gregorysmolin/"
                    aria-label="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                  >
                    <svg width="17" height="16" viewBox="0 0 17 16" className="fill-current">
                      <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">Useful Links</h2>
                <ul>
                  <li>
                    <Link
                      href="/workspace"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                    >
                      Demo
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/TheTranceMachine/composition-book-demo"
                      target="_blank"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                    >
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://thetrancemachine.github.io/blog/"
                      target="_blank"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">Contact</h2>
                <ul>
                  <li>
                    <Link
                      href="mailto:grzegorz.smolin2@gmail.com"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                    >
                      grzegorz.smolin2@gmail.com
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/TheTranceMachine"
                      target="_blank"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                    >
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.linkedin.com/in/gregorysmolin/"
                      target="_blank"
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-sandwisp dark:text-body-color-dark dark:hover:text-sandwisp"
                    >
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-8 z-[-1]">
          <svg className="w-10 h-10" viewBox="0 0 162 119" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.913757 114.53C13.9807 116.216 32.3056 122.378 43.7012 113.083C51.0025 107.128 57.0714 99.6064 62.6869 92.0921C73.647 77.4257 81.4769 57.0014 83.9262 38.9656C86.7749 17.9886 65.2558 22.4197 58.3958 36.6239C48.6178 56.8698 53.4826 94.2165 79.0133 100.444C108.309 107.591 123.562 71.7844 130.096 49.9154C134.773 34.2631 153.849 -9.9389 143.644 2.81731C137.309 10.736 128.12 15.6577 122.008 23.6058C118.81 27.7641 121.911 27.9558 125.382 25.0963C131.067 20.4118 136.477 14.6482 140.667 8.60318C141.379 7.57589 145.275 0.763508 146.837 3.12604C151.902 10.7886 153.525 20.5514 158.568 28.4832"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M132.848 24.4348C141.945 26.8851 150.961 28.4036 160.05 30.4235C162.841 31.0437 159.046 30.7305 158.171 30.7851"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="absolute top-8 left-16 z-[-1] scale-y-[-1] scale-x-[-1]">
          <svg className="w-10 h-10" viewBox="0 0 85 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M84.1428 1.12604C68.4579 15.0432 48.2728 24.8484 26.7076 22.7737C20.393 22.1662 13.251 19.5041 7.51 16.6647C6.29685 16.0646 5.19832 15.2656 4.08583 14.4969C3.06981 13.7949 4.95423 22.296 5.12047 23.2959C6.89794 33.9863 5.2443 22.4385 4.04146 18.4653C3.10796 15.3818 1.13626 12.2911 0.701068 9.07517C0.350636 6.4856 5.49948 7.02736 7.26614 6.8582C9.08258 6.68426 20.8214 3.77937 19.2507 7.81152C16.4328 15.0458 10.9147 19.889 6.01223 25.5572"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="absolute top-32 right-16 z-[-1] scale-x-[-1]">
          <svg className="w-10 h-10" viewBox="0 0 69 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.563538 86.4441C9.62047 89.2172 16.6734 91.0373 25.3582 87.062C32.131 83.9619 38.9967 80.1472 44.485 75.0561C50.4537 69.5194 57.9022 61.3399 53.1364 53.1378C49.3227 46.5744 43.2597 40.2549 43.2597 32.3089C43.2597 23.5235 48.7541 18.3068 54.9775 12.9941C58.6952 9.82034 63.0893 5.84965 65.693 1.65486C66.8291 -0.175672 57.9801 2.37935 56.7613 2.69535C56.4809 2.76805 57.7534 3.40302 58.0609 3.80379C59.7892 6.05612 60.7498 8.83608 62.4864 11.1169C66.0039 15.7368 66.9283 3.54324 68.4493 1.40005"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
