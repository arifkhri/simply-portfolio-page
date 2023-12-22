"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import dayjs from "dayjs"
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
import { cn } from "@/lib/shadcnUI"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/Calendar"
import { profileStore } from "@/lib/zustand/stores/profileStore"


const formSchema = z.object({
  companyName: z.string().min(1, "Field wajib diisi"),
  position: z.string().min(1, "Field wajib diisi"),
  startDate: z.string().min(1, "Field wajib diisi"),
  endDate: z.string().min(1, "Field wajib diisi"),
  description: z.string().min(1, "Field wajib diisi"),
})

const ExperienceForm = ({afterSubmit}) => {
  const { addWorkExperiences, workExperienceDetail, updateWorkExperience, setWorkExperienceDetail } = profileStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: workExperienceDetail ? {
      ...workExperienceDetail,
    } : {
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  })

  const {isLoading, mutate} = useMutation({
    mutationFn: (payload) => {
    if(workExperienceDetail) {
        return updateWorkExperience(workExperienceDetail.id, payload)
      }
      return addWorkExperiences(payload);
    },
  })

  async function onSubmit(values) {
    const payload = {
      ...values,
      startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
    }

    await mutate(payload);

    toast(`Data berhasil ${workExperienceDetail ? 'diubah' : 'dibuat'}`);

    // clear detail data;
    if(workExperienceDetail) {
      setWorkExperienceDetail(null);
    }

    afterSubmit();
  }

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jabatan</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Perusahaan</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-3">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Mulai</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "md:w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value).format('DD-MM-YYYY')
                        ) : (
                          <></>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(value) => {
                        field.onChange(dayjs(value).format('YYYY-MM-DD'))
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Selesai</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "md:w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value).format('DD-MM-YYYY')
                        ) : (
                          <></>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(value) => {
                        field.onChange(dayjs(value).format('YYYY-MM-DD'))
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
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
          <Button disabled={isLoading} type="submit">{workExperienceDetail ? 'Ubah' : 'Tambah'}</Button>
        </div>
      </form>
    </Form>

    </div>
  )
}

export default ExperienceForm;
