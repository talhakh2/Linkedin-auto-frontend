import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Main from '../dashboard/main'
import ConnectionCompaign from '../connection/start'
import CommentingCompaign from '../commenting/start'
import CreateCsvCompaign from '../connection/createCsvCompaign'
import CreateLinkdinSearchCompaign from '../connection/createLinkdinSearchCompaign'
import CreateCommentingCompaign from '../commenting/createCommentingCompaign'

const Dashboard = () => {
    const [isActive, setIsActive] = useState(true)
    const [activeCampaign, setActiveCampaign] = useState("");
    const [connectionCompaignType, setConnectionCompaignType] = useState("")
    const [commentingCompaignType, setCommentingCompaignType] = useState("")
    const [isshow,setIsShow] = useState(true)

  useEffect(()=>{

    if(activeCampaign)
    {
        setIsShow(false)

    }else if(connectionCompaignType || commentingCompaignType)
    {
        setIsShow(false)
    }

  },[activeCampaign,connectionCompaignType,commentingCompaignType])
   

  return (
        <div className="flex flex-col h-screen">
        <Navbar setActiveCampaign={setActiveCampaign} isshow={isshow} />
        <div className="flex flex-1">
            <Sidebar 
                isActive={isActive}
                setIsActive={setIsActive}
                setActiveCampaign={setActiveCampaign}
                setConnectionCampaignType={setConnectionCompaignType}
                setCommentingCampaignType={setCommentingCompaignType}
                setIsShow={setIsShow}
            />
            {activeCampaign === "" && connectionCompaignType=== "" && commentingCompaignType==="" ? (
                    isActive && (
                        <Main />
                    )
                ) : (
                    <>
                        {activeCampaign === "connection" && <ConnectionCompaign 
                        setConnectionCompaignType={setConnectionCompaignType}
                        setActiveCampaign={setActiveCampaign}
                        />}

                        {activeCampaign === "commenting" && <CommentingCompaign 
                        setCommentingCompaignType={setCommentingCompaignType} 
                        setActiveCampaign={setActiveCampaign}
                        />}
                    </>
                )
                }

                {
                    activeCampaign==="" && connectionCompaignType==="linkdin" && <CreateLinkdinSearchCompaign
                    setActiveCampaign={setActiveCampaign}
                    setConnectionCompaignType={setConnectionCompaignType}
                    />
                }
                 {
                    activeCampaign==="" && connectionCompaignType==="csv" && <CreateCsvCompaign
                    setActiveCampaign={setActiveCampaign}
                    setConnectionCompaignType={setConnectionCompaignType}
                    />
                }
                {
                    activeCampaign==="" && commentingCompaignType === "linkdin" && <CreateCommentingCompaign
                    setActiveCampaign={setActiveCampaign}
                    setCommentingCompaignType={setCommentingCompaignType}
                    />
                }
            
        </div>
    </div>
  )
}

export default Dashboard
