"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/Textarea"
import { profileStore } from "@/lib/zustand/stores/profileStore"
import { toBase64 } from "@/utils/common"


const formSchema = z.object({
  name: z.string().min(1, "Field wajib diisi"),
  jobTitle: z.string().min(1, "Field wajib diisi"),
  bannerImg: z.string().min(1, "Field wajib diisi"),
  avatar: z.string().min(1, "Field wajib diisi"),
  shortDescription: z.string().min(1, "Field wajib diisi"),
})

const ExperienceForm = ({ afterSubmit }) => {
  const { updateProfile, profile } = profileStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {...profile, avatar: '', bannerImg: '' },
  })

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload) => {
      return updateProfile(payload)
    },
  })

  async function onSubmit(formValues) {
    const avatar = await toBase64(document.querySelector('input[name=avatar]').files[0]);
    const bannerImg = await toBase64(document.querySelector('input[name=bannerImg]').files[0]);
    const payload = {
      ...formValues,
      avatar: avatar,
      bannerImg: bannerImg,
    }

    await mutate(payload);

    toast('Berhasil mengubah data');

    afterSubmit();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="bannerImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Profile</FormLabel>
                <FormControl>
                  <Input {...field} type="file" accept="image/*" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto Profile</FormLabel>
                <FormControl>
                  <Input {...field} type="file" accept="image/*" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title / Posisi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button className="mt-3 md:mt-0" variant="outline" type="button" disabled={isLoading} onClick={() => afterSubmit()}>Batal</Button>
            <Button disabled={isLoading} type="submit">Simpan</Button>
          </div>
        </form>
      </Form>

    </div>
  )
}

export default ExperienceForm;
