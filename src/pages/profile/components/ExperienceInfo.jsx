"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import dayjs from 'dayjs';

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { profileStore } from "@/lib/zustand/stores/profileStore";
import ExperienceForm from "./ExperienceForm";
import { Pencil, Trash2 } from "lucide-react";

const Empty = () => {
  return (
    <div className="layout flex items-center justify-center text-center">
      <p className="my-5">Pengalaman Kerja belum ditambahkan</p>
    </div>
  )
}

const ExperienceInfo = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { getWorkExperiences, workExperiences, deleteWorkExperience, setWorkExperienceDetail } = profileStore()

  const { isLoading: loadingQuery } = useQuery({
    queryKey: ['getExperiences'], queryFn: async () => {
      return getWorkExperiences();
    }
  });

  const { isLoading: loadingMutation, mutate } = useMutation({
    mutationKey: ['deleteExperiences'], mutationFn: async (id) => {
      return deleteWorkExperience(id);
    }
  });

  const onRemove = async (id) => {
    await mutate(id);
  }

  const showUpdateDialog = (detailData) => {
    setWorkExperienceDetail(detailData)
    setShowDialog(true)
  }

  return (
    <>
      <div className="flex flex-col justify-between">
        <Card>
          <CardHeader>
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-2xl"><strong>Pengalaman Kerja</strong></h3>

              <Button disabled={workExperiences.length === 10} className="p-0" variant="link" onClick={() => setShowDialog(true)}>Tambah +</Button>
            </div>
          </CardHeader>

          <CardContent>
            {
              (loadingMutation || loadingQuery) && (
                <div className="layout flex items-center justify-center text-center">
                  <p className="my-5">Loading...</p>
                </div>
              )
            }
            {
              (workExperiences || []).length > 0 && (!loadingQuery && !loadingMutation) ? (workExperiences).map(({ position, companyName, description, startDate, endDate, id }) => (
                <>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h6><strong>{position}</strong></h6>
                    <p className="text-lg">{companyName}</p>
                    <div className="flex flex-row text-slate-500 text-sm">
                      <span>{dayjs(startDate).format('MMMM YYYY')}</span> -
                      <span>{dayjs(endDate).format('MMMM YYYY')}</span>
                    </div>
                    <p>{description}</p>
                  </div>
                  <div className="flex flex-row w-[80px]">
                    <Button variant="link" className="p-0" size="icon" onClick={() => showUpdateDialog({
                      position, companyName, description, startDate, endDate, id
                    })}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="link" className="p-0" size="icon" onClick={() => onRemove(id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                  <Separator className="my-3" />
                </>
              )) : (!loadingQuery && !loadingMutation) ? <Empty /> : ''
            }
          </CardContent>
        </Card>
      </div>

      <Dialog className="max-h-screen overflow-auto" open={showDialog}>
        <DialogContent onClose={() => setShowDialog(false)} className="max-h-screen overflow-auto flex flex-col md:max-w-max">
          <DialogHeader>
            <DialogTitle>Tambah Pengalaman Kerja</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ExperienceForm  afterSubmit={() => setShowDialog(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExperienceInfo;
