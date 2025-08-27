import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import '../App.css';
import { PlusIcon } from '../icons/plusicon';
import { ShareIcon } from '../icons/shareIcon';
import { Card } from '../components/card';
import { CreatComponentModal } from '../components/CreateContentModal';
import { Sidebar } from '../components/sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false); // ✅ fixed
  const {contents, refresh} = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);



  return <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-1 border-gray-100 shadow-md">
        <CreatComponentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            size="small"
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />

          <Button onClick={ async() => {
          const response =  await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {

                share: true
            }, {

            headers: {
                "Authorization" : localStorage.getItem("token")
            }
            });

const shareUrl = `http://localhost:5173/share/ ${response.data.hash}`;
alert(shareUrl);
          }}
            size="medium"
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="flex gap-4 flex-wrap">
         
          {contents.map(({ type, link, title }, idx) =>
            <Card key={idx} type={type} link={link} title={title} />
        )}
        </div>
      </div>
    </div>
  
}

export default Dashboard;
