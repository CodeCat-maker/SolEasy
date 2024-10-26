import Image from 'next/image'

import TestimonialImage01 from '@/public/images/testimonial-01.jpg'
import TestimonialImage02 from '@/public/images/testimonial-02.jpg'
import TestimonialImage03 from '@/public/images/testimonial-03.jpg'

export default function Testimonials() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">The Best Case</h2>
            <p className="text-xl text-gray-400">
              Who use our product to build their business and achieve their
              dream
            </p>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">
            {/* 1st testimonial */}
            <div
              className="flex flex-col h-full p-6 bg-gray-800"
              data-aos="fade-up"
            >
              <div className="flex justify-between align-center">
                <div className="relative inline-flex flex-col mb-4">
                  <Image
                    className="rounded-full"
                    src="https://pump.mypinata.cloud/ipfs/QmZbmEigMRWC9HD5jwdFjdcvqA3RoZQriAnpCpuoQ2Bcny?img-width=256&img-dpr=2&img-onerror=redirect"
                    width={48}
                    height={48}
                    alt="Testimonial 01"
                    unoptimized
                  />
                  <svg
                    className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                    viewBox="0 0 24 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
                <div className="text-xl">$RFROG</div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">
                The meme coin Group Fastly
                <br />
                🔥 24h reach 10x
                <br />
                🚀 48h reach 20x
                <Image
                  src="https://ice.frostsky.com/2024/10/27/b21646f9f80056e2252fe12f2a919137.png"
                  alt="$RFROG"
                  width={300}
                  height={300}
                  unoptimized
                ></Image>
              </blockquote>
            </div>

            {/* 2nd testimonial */}
            <div
              className="flex flex-col h-full p-6 bg-gray-800"
              data-aos="fade-up"
            >
              <div className="flex justify-between align-center">
                <div className="relative inline-flex flex-col mb-4">
                  <Image
                    className="rounded-full"
                    src="https://ice.frostsky.com/2024/10/27/15f885e32202ab1f8b06ebdb41bb48f1.png"
                    width={48}
                    height={48}
                    alt="Testimonial 01"
                    unoptimized
                  />
                  <svg
                    className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                    viewBox="0 0 24 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
                <div className="text-xl">$AI</div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">
                The meme coin Group Fastly
                <br />
                🔥 24h reach 10x
                <br />
                🚀 48h reach 0x
                <Image
                  src="https://ice.frostsky.com/2024/10/27/039c58feb06f7c3f45ec08c0d0cabbf3.png"
                  alt="$AI"
                  width={300}
                  height={300}
                  unoptimized
                ></Image>
              </blockquote>
            </div>
            {/* 3rd testimonial */}
            <div
              className="flex flex-col h-full p-6 bg-gray-800"
              data-aos="fade-up"
            >
              <div className="flex justify-between align-center">
                <div className="relative inline-flex flex-col mb-4">
                  <Image
                    className="rounded-full"
                    src="https://ice.frostsky.com/2024/10/27/125143d8c7c20df44d4dbb7a4ceaf310.png"
                    width={48}
                    height={48}
                    alt="Testimonial 01"
                    unoptimized
                  />
                  <svg
                    className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600"
                    viewBox="0 0 24 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
                <div className="text-xl">$RFROG</div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">
                The meme coin Group Fastly
                <br />
                🔥 24h reach 10x
                <br />
                🚀 48h reach 20x
                <Image
                  src="https://ice.frostsky.com/2024/10/27/e4eb3b094d4625a1e9eff73c8d2379e3.png"
                  alt="$RFROG"
                  width={300}
                  height={300}
                  unoptimized
                ></Image>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
