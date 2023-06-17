import Image from 'next/image';

export default function TalkItem({data: talkItem}){
    const talkId = talkItem.TALK_ID;
    const talkUserId = talkItem.TALK_USER_ID;
    const talkTitle = talkItem.TALK_TITLE;
    const talkContent = talkItem.TALK_CONTENT;
    const talkCategory = talkItem.TALK_CATEGORY;
    const parentTalkId = talkItem.PARENT_TALK_ID;
    const imgSrc = "/brunnerLogo.png";

    return (
        // 대화 항목
        <div className="talk-item flex flex-col w-full h-auto mx-auto border-y-2 border-gray-300 mb-1">

          {/* 타이틀 */}
          <div className="flex flex-row w-full h-auto">  
            
            {/* 타이틀 이미지 */}
            <Image src={imgSrc} 
                    alt='talkUserId'
                    width={0} 
                    height={0} 
                    sizes="100vw" 
                    style={{ width: '40px', height: '40px', padding: '10px' }} 
                    objectfit="cover" 
                    quality={100}
                    />

                {/* 글 제목 */}
                <div className="flex flex-col w-full p-2 border-b-gray-300 border-b-2 text-black dark:text-white">
                  <b>[{talkUserId}]{talkTitle}</b>
                </div>
          </div>
          
          {/* 글 본문 */}
          <div className="flex flex-row w-full h-full p-2 text-black dark:text-white">  
          {talkContent}
          </div>

        </div>
    )
}