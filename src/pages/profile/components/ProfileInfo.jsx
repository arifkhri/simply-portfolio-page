import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { profileStore } from "@/lib/zustand/stores/profileStore";

import ProfileForm from './ProfileForm'

const ProfileInfo = () => {
  const { getProfile, profile } = profileStore()
  const [showDialog, setShowDialog] = useState(false);

  useQuery({
    queryKey: ['getProfile'], queryFn: async () => {
      return getProfile();
    }
  });

  return (
    <>
      <Card className="flex flex-col mb-10 rounded-t relative">

        <Button className="rounded-full px-2 py-1 absolute top-[5px] z-10 right-[5px] h-8" variant="outline" onClick={() => setShowDialog(true)}><Pencil className="h-3 w-4" /></Button>
        <CardContent className="p-0 rounded-t">
          <div className="rounded-t w-full flex flex-row flex-wrap p-3 antialiased relative h-[80px] md:h-[130px]" style={{
            backgroundImage: `url(${profile?.bannerImg || 'https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'})`,
            backgroundRepeat: 'no-repat',
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply'

          }}
          >
            <div className="w-[80px] md:w-[100px] absolute bottom-[-47px]">
              <img className="rounded-full antialiased" src={profile?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
            </div>
          </div>
          <div className="w-full px-3 pb-6">
            <div className="w-full mt-16 text-gray-700 font-semibold relative pt-3 md:pt-0">
              <div className="text-2xl font-light">{profile?.name || '-'}</div>
              <div className="text-base"><strong>{profile?.jobTitle || '-'}</strong></div>
              <p className="text-sm text-slate-500 font-light">{profile?.description || '-'}</p>
            </div>
          </div>
        </CardContent>
      </Card >

      <Dialog open={showDialog}>
        <DialogContent onClose={() => setShowDialog(false)} className="max-h-screen overflow-auto flex flex-col md:max-w-max">
          <DialogHeader>
            <DialogTitle>Tambah Pengalaman Kerja</DialogTitle>
          </DialogHeader>
          <div className="md:w-[350px] py-4">
            <ProfileForm afterSubmit={() => setShowDialog(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ProfileInfo;
