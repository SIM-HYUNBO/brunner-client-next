`use strict`

import SupportContentAnimation from './content-animation/support-content-animation'
import { useRouter } from 'next/router'

export default function SupportIntro() {
  const router = useRouter()

  return (
    <>
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-10 font-medium text-green-900">
          항상 곁에 있습니다.
        </h1>
        <div className="main-governing-text">
          도움이 필요하십니까? <br />
          고객이 성공할 수 있도록 길을 열어 리딩합니다. <br />
          Brunner의 콜센터는 언제나 고객과 함께합니다. <br />
          바로 연락하십시요.
        </div>
        <div className="flex justify-center">
          <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            <GetCallCenter />
          </button>
        </div>
      </div>
      <div className="lg:h-2/6 lg:w-2/6">
        <SupportContentAnimation />
      </div>
    </>
  );
}

export function GetCallCenter() {
  return (
    <a className="text-white-900" href={`tel:01075448698`}>콜센터 연결하기</a>
  )
}