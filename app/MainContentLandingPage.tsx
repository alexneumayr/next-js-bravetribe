'use client';
import { Button } from '@/components/shadcn/button';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function MainContentLandingPage() {
  const router = useRouter();
  const firstSectionRef = useRef<HTMLElementTagNameMap['section']>(null);
  return (
    <div className="mx-auto max-w-[1300px] px-4 sm:px-10">
      <header className="max-w-[1000px] mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-[100px] font-bold text-center leading-tight mt-8">
          Are you ready to{' '}
          <span className="text-secondary">!XXXchallenge </span>
          yourself?
        </h1>
        <div className="mt-6 md:mt-10 lg:mt-14 flex justify-center gap-20">
          <Button
            variant="secondary"
            onClick={() => {
              router.push('/access?mode=join');
            }}
          >
            LET'S START
          </Button>
          <Button
            onClick={() =>
              firstSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            Learn more
          </Button>
        </div>
      </header>
      <section className="space-y-10 mt-10" ref={firstSectionRef}>
        <div className="sm:grid grid-cols-[1fr_3fr] sm:gap-4 lg:gap-8 items-center">
          <div>
            <h2 className="text-2xl xl:text-[40px] xl:mb-2 sm:text-3xl font-bold lg:text-4xl">
              Welcome to Brave Tribe
            </h2>
            <p className="text-md xl:text-2xl lg:text-lg font-normal">
              Brave Tribe is more than just a regular community—it's a movement.
              We are a tribe of fearless explorers, risk-takers, and adventure
              seekers who believe that growth comes from stepping outside our
              comfort zones. Whether you're taking your first small step or
              embarking on a life-changing journey, Brave Tribe is here to
              support and empower you.
            </p>
          </div>
          <img
            src="/logos/logo-full.png"
            alt="BraveTribe logo large"
            className="xl:max-w-[320px] mt-10 sm:mt-0 max-w-[250px] mx-auto sm:max-w-[150px] order-first lg:max-w-[200px]"
          />
        </div>
        <div className="md:grid grid-cols-[2fr_1fr] sm:gap-4 lg:gap-8 items-center">
          <div>
            <h2 className="text-2xl xl:text-[40px] xl:mb-2 sm:text-3xl font-bold lg:text-4xl">
              A Tribe of Risk-Takers
            </h2>
            <p className="text-md xl:text-2xl lg:text-lg font-normal">
              We are a close-knit group of people who thrive on pushing
              boundaries and stepping into the unknown. Whether you're trying
              public speaking, solo traveling, social experiments, or extreme
              sports, we support and inspire each other along the way.
            </p>
            <p className="text-md xl:text-2xl lg:text-lg font-semibold mt-3">
              Share your experiences and get motivation from the community.
            </p>
          </div>
          <div className="flex-none">
            <img
              src="/misc/community.jpg"
              alt="people holding their shoulders"
              className="max-w-[499x] max-h-[281px] rounded-[25px] mt-10 mx-auto"
            />
          </div>
        </div>
      </section>
      <section>
        <h3 className="text-4xl md:text-[59px] font-bold text-center my-12">
          What Our Members Say
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          <div className="border border-zinc-600 rounded-[25px] p-6 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="testimonials/alessandra.jpg"
                alt="alessandra"
                className="max-w-[60px] max-h-[60px] rounded-full"
              />
              <div>
                <h4 className="text-lg font-bold">Alessandra K. (29)</h4>
                <p className="text-lg font-normal leading-tight">
                  Entrepreneur
                </p>
              </div>
            </div>
            <p className="text-lg font-normal">
              This community changed my life. I did things I never thought
              possible!
            </p>
          </div>
          <div className="border border-zinc-600 rounded-[25px] p-6 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="testimonials/daniel.jpg"
                alt="daniel"
                className="max-w-[60px] max-h-[60px] rounded-full"
              />
              <div>
                <h4 className="text-lg font-bold">Daniel S. (41)</h4>
                <p className="text-lg font-normal leading-tight">
                  Startup Founder
                </p>
              </div>
            </div>
            <p className="text-lg font-normal">
              Brave Tribe gave me the confidence to finally start my dream
              business. The support is incredible!
            </p>
          </div>
          <div className="border border-zinc-600 rounded-[25px] p-6 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="testimonials/emily.jpg"
                alt="emily"
                className="max-w-[60px] max-h-[60px] rounded-full"
              />
              <div>
                <h4 className="text-lg font-bold">Emily R. (32)</h4>
                <p className="text-lg font-normal leading-tight">
                  Digital Nomad
                </p>
              </div>
            </div>
            <p className="text-lg font-normal">
              I've grown more in the past 6 months than I did in the last 6
              years.
            </p>
          </div>
          <div className="border border-zinc-600 rounded-[25px] p-6 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="testimonials/michael.jpg"
                alt="michael"
                className="max-w-[60px] max-h-[60px] rounded-full"
              />
              <div>
                <h4 className="text-lg font-bold">Michael T. (33)</h4>
                <p className="text-lg font-normal leading-tight">
                  Software Engineer
                </p>
              </div>
            </div>
            <p className="text-lg font-normal">
              I never thought I'd go skydiving, but with Brave Tribe, I made it
              happen!
            </p>
          </div>
          <div className="border border-zinc-600 rounded-[25px] p-6 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="testimonials/jordan.jpg"
                alt="jordan"
                className="max-w-[60px] max-h-[60px] rounded-full"
              />
              <div>
                <h4 className="text-lg font-bold">Jordan M. (55)</h4>
                <p className="text-lg font-normal leading-tight">
                  Marketing Specialist
                </p>
              </div>
            </div>
            <p className="text-lg font-normal">
              Pushing my limits with this community has been the most rewarding
              experience of my life.
            </p>
          </div>
          <div className="border border-zinc-600 rounded-[25px] p-6 space-y-6">
            <div className="flex items-center gap-3 ">
              <img
                src="testimonials/olivia.jpg"
                alt="olivia"
                className="max-w-[60px] max-h-[60px] rounded-full "
              />
              <div>
                <h4 className="text-lg font-bold">Olivia K. (26)</h4>
                <p className="text-lg font-normal leading-tight">
                  Adventure Blogger
                </p>
              </div>
            </div>
            <p className="text-lg font-normal">
              I finally stopped procrastinating and took real action. Now, I'm
              more confident than ever!
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center mb-16">
        <h3 className="text-4xl md:text-[59px] font-bold mt-12">
          Join Our Community Today
        </h3>
        <p className="mt-5 text-xl md:text-[29px] font-semibold mb-8">
          If you're ready to step out, now is the time.
        </p>
        <Button
          onClick={() => router.push('/access?mode=join')}
          variant="secondary"
          className="flex-none"
        >
          JOIN NOW
        </Button>
      </section>
    </div>
  );
}
