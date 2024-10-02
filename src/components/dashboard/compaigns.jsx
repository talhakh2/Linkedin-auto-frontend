import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CompaignsDashboard from '../compaignsDashboard';
import CommentCompaignsDashboard from '../commentCompaignsDashboard';


const apiUrl = process.env.REACT_APP_API_URL;

const CampaignCard = ({ campaign, onToggle, onClick }) => (
  <div className='text-[#1F384C] pt-5'>
    <div className='w-full h-20 flex items-center justify-between bg-[#F1F2F7] rounded-lg px-5'>
      <div className='flex flex-col items-start cursor-pointer' onClick={onClick}>
        <p className='text-base font-bold'>
          {campaign.name}{' '}
          <span className='text-[#8E8E93] font-medium text-base'>({campaign.type})</span>
        </p>
        <p className='text-[#8E8E93] text-sm font-normal'>
          Created on {new Date(campaign.createdOn).toLocaleDateString()}
        </p>
      </div>
      <label className='inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          className='sr-only peer'
          checked={campaign.isToggled}
          onChange={onToggle}
        />
        <div className='relative w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-[#2B2D42] peer-checked:bg-[#3C82F6] after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full'></div>
      </label>
    </div>
  </div>
);

const Campaigns = () => {
  const userId = useSelector((state) => state.authentication._id);
  const [campaignList, setCampaignList] = useState([]);
  const [commentCampaignList, setCommentCampaignList] = useState([]);

  const [showList, setShowList] = useState(true);
  const [type, setType] = useState('');
  const [campaignName, setCampaignName] = useState('');


  const [invitedUsers, setInvitedUsers] = useState([])
  const [commentCampaignData, setCommentCampaignData] = useState([])


  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/campaign/getAll/${userId}`);
        setCampaignList(data.campaigns);
        setCommentCampaignList(data.commentCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    if (userId) fetchCampaigns();
  }, [userId]);


  const handleToggle = async (id, type) => {
    const selectedCampaign =
      type === "Commenting"
        ? commentCampaignList.find(campaign => campaign._id === id)
        : campaignList.find(campaign => campaign._id === id);

    console.log("Selected campaign: ", selectedCampaign);

    try {
      const apiEndpoint = selectedCampaign.isToggled ? 'stop-campaign' : 'start-campaign';
      const payload = { campaign_id: selectedCampaign._id, type };

      if (!selectedCampaign.isToggled) {
        if (type === "Commenting") {
          payload.posts = selectedCampaign.posts;
          payload.account_id = 'S8ogIYcpR8Om5W7UKggREw';
        } else if (type === "Connection") {
          payload.users = selectedCampaign.users;
          payload.message = selectedCampaign.Connection_Request_Message;
          payload.Follow_up_Message = selectedCampaign.Follow_up_Message
          payload.dm_time = selectedCampaign.dm_time
          payload.account_id = 'S8ogIYcpR8Om5W7UKggREw';
        }
      }

      await axios.post(`${apiUrl}/api/v1/campaignStates/${apiEndpoint}`, payload);
      console.log(`Campaign ${selectedCampaign.isToggled ? 'stopped' : 'started'}.`);

      if (type === "Commenting") {
        setCommentCampaignList(prevState =>
          prevState.map(campaign =>
            campaign._id === id
              ? { ...campaign, isToggled: !campaign.isToggled }
              : campaign
          )
        );
      } else {
        setCampaignList(prevState =>
          prevState.map(campaign =>
            campaign._id === id
              ? { ...campaign, isToggled: !campaign.isToggled }
              : campaign
          )
        );
      }

    } catch (error) {
      console.error(`Error ${selectedCampaign.isToggled ? 'stopping' : 'starting'} campaign:`, error.message);
    }
  };


  const handleClick = async (id, type, name) => {
    try {
      if (type === "Commenting") {
        const { data } = await axios.get(`${apiUrl}/api/v1/campaign/getCommentCampaignData/${id}`);
        console.log("data: ", data.commentCampaignData[0]);
        setCommentCampaignData(data.commentCampaignData[0])
      } else {
        const { data } = await axios.get(`${apiUrl}/api/v1/campaign/getConnectionCampaignData/${id}`);
        console.log("data: ", data.invitedUsers[0]);
        setInvitedUsers(data.invitedUsers[0])
      }
      setCampaignName(name)
      setType(type)
      setShowList(false);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  return showList ? (
    <>
      {[...campaignList, ...commentCampaignList].map((campaign, index) => (
        <CampaignCard
          key={index}
          campaign={campaign}
          onToggle={() => handleToggle(campaign._id, campaign.type)}
          onClick={() => handleClick(campaign._id, campaign.type, campaign.name)}
        />
      ))}
    </>
  ) : (
    <>
      {
        type === "Connection" ?
          <CompaignsDashboard
            invitedUsers={invitedUsers}
            campaignName={campaignName}
          /> :
          <CommentCompaignsDashboard
            commentCampaignData={commentCampaignData}
            setCommentCampaignData={setCommentCampaignData}
            campaignName={campaignName}
          />
      }

    </>

  );
};

export default Campaigns;
